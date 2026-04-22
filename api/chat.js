const CV_CONTEXT = require("./cvContext");

const MAX_INPUT_LENGTH = 20;

const MSG_TOO_LONG =
  'Câu hỏi quá dài rồi! Hãy hỏi ngắn gọn trong vài từ thôi nhé — ví dụ: "số điện thoại", "kỹ năng", "dự án", "kinh nghiệm"...';

function buildSystemPrompt() {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 2023;

  return `Bạn là AI assistant được nhúng vào portfolio của Lê Trần Thành Luân — một Full-stack Developer.
Nhiệm vụ duy nhất: trả lời câu hỏi liên quan đến CV, kỹ năng, dự án, kinh nghiệm và thông tin liên hệ của Luân.

THÔNG TIN THỜI GIAN (tính tự động):
- Năm hiện tại: ${currentYear}
- Luân bắt đầu làm việc chuyên nghiệp từ đầu năm 2023
- Số năm kinh nghiệm: khoảng ${experienceYears} năm (2023 → ${currentYear})

XỬ LÝ CÂU HỎI "TỔNG QUAN" hoặc câu hỏi chung về Luân:
Nếu người dùng hỏi "tổng quan", "giới thiệu", "introduce", "overview", "Luân là ai", hoặc câu hỏi chung chung về Luân, hãy trả lời theo đúng format này (bullet points, vui vẻ):
- 👨‍💻 Full-stack Developer với ~${experienceYears} năm kinh nghiệm
- ⚡ Mạnh về Frontend (React, Next.js, TypeScript) & Backend (Go, Node.js)
- 🚀 Đã xây dựng ${6} dự án thực tế: BizTik, Mall, Admin Console, ExpenseFlow, Gremsy, SoundSpace
- 😎 Đẹp trai, nhiệt huyết, sẵn sàng cho cơ hội mới tại HCM!

QUY TẮC BẮT BUỘC:
1. Nếu câu hỏi KHÔNG liên quan đến Luân (hỏi về AI, thời tiết, code nói chung, bạn là model gì, v.v.), KHÔNG được xin lỗi. Thay vào đó hãy gợi ý thân thiện: "Mình chỉ biết về Luân thôi 😄 Thử hỏi: tổng quan, kỹ năng, dự án, kinh nghiệm, liên hệ?"
2. Câu trả lời PHẢI ngắn gọn — chỉ dùng bullet points, tối đa 4 ý. Không viết đoạn văn dài.
3. Luôn trả lời bằng ngôn ngữ người dùng đang dùng (Việt hoặc Anh).
4. Không bịa đặt thông tin ngoài CV data.

CV data của Luân:
${CV_CONTEXT}`;
}

// ─── Gemini ──────────────────────────────────────────────────────────────────
async function callGemini(messages) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: buildSystemPrompt() }] },
        contents,
        generationConfig: { temperature: 0.5, maxOutputTokens: 256 },
      }),
    },
  );

  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "Xin lỗi, tôi không thể tạo phản hồi lúc này."
  );
}

// ─── OpenRouter ───────────────────────────────────────────────────────────────
async function callOpenRouter(messages) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("Missing OPENROUTER_API_KEY");

  const model = process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001";

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://portfolio.thanhluan.dev",
      "X-Title": "Luân's Portfolio AI",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 256,
      temperature: 0.5,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));

  return (
    data?.choices?.[0]?.message?.content ??
    "Xin lỗi, tôi không thể tạo phản hồi lúc này."
  );
}

// ─── Handler ──────────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid messages array" });
  }

  const lastMsg = messages[messages.length - 1];
  if (
    lastMsg.role === "user" &&
    lastMsg.content.trim().length > MAX_INPUT_LENGTH
  ) {
    return res.status(200).json({ reply: MSG_TOO_LONG });
  }

  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();

  try {
    const history = messages.slice(-20);
    let reply;

    if (provider === "openrouter") {
      reply = await callOpenRouter(history);
    } else {
      reply = await callGemini(history);
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error(`[${provider}] error:`, err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
