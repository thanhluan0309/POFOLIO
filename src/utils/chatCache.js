const STORAGE_KEY = "portfolio_chat_cache";
const TTL_MS = 72 * 60 * 60 * 1000; // 72 giờ

// ─── Normalize ────────────────────────────────────────────────────────────────
function normalize(str) {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // bỏ dấu
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ─── Levenshtein distance ─────────────────────────────────────────────────────
function levenshtein(a, b) {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  // Dùng 2 hàng thay vì ma trận đầy đủ để tiết kiệm memory
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  let curr = new Array(b.length + 1);

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[b.length];
}

function fuzzyThreshold(a, b) {
  // Tối đa 25% độ dài chuỗi dài hơn, giới hạn [1, 3]
  return Math.min(
    3,
    Math.max(1, Math.floor(Math.max(a.length, b.length) * 0.25)),
  );
}

// ─── LocalStorage helpers ─────────────────────────────────────────────────────
function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function save(cache) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {}
}

function pruneExpired(cache) {
  const now = Date.now();
  for (const key of Object.keys(cache)) {
    if (now - cache[key].ts >= TTL_MS) delete cache[key];
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Tìm cached answer với 3 chiến lược theo thứ tự ưu tiên:
 *  1. Exact match sau normalize
 *  2. Keyword subset: mọi từ quan trọng trong input đều có trong cached key
 *  3. Levenshtein fuzzy: khoảng cách edit ≤ ngưỡng động
 */
export function getCached(question) {
  const cache = load();
  const now = Date.now();
  const q = normalize(question);

  const validEntries = Object.entries(cache).filter(
    ([, entry]) => now - entry.ts < TTL_MS,
  );

  // 1. Exact match
  const exact = cache[q];
  if (exact && now - exact.ts < TTL_MS) return exact.answer;

  // 2. Keyword subset (từ > 2 ký tự để bỏ stop words ngắn)
  const words = q.split(" ").filter((w) => w.length > 2);
  if (words.length > 0) {
    for (const [key, entry] of validEntries) {
      const keyWords = new Set(key.split(" "));
      if (words.every((w) => keyWords.has(w))) return entry.answer;
    }
  }

  // 3. Levenshtein fuzzy match
  for (const [key, entry] of validEntries) {
    const dist = levenshtein(q, key);
    if (dist <= fuzzyThreshold(q, key)) return entry.answer;
  }

  return null;
}

/**
 * Lưu cặp question-answer, tự prune expired entries.
 */
export function setCached(question, answer) {
  const cache = load();
  cache[normalize(question)] = { question, answer, ts: Date.now() };
  pruneExpired(cache);
  save(cache);
}
