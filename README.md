# Personal Portfolio

Portfolio cá nhân xây dựng bằng React, tích hợp AI chatbot (Gemini / OpenRouter) để tương tác với visitor.

## Tech Stack

- **Frontend:** React 19, Tailwind CSS, Framer Motion, GSAP, AOS
- **AI Chat:** Gemini API hoặc OpenRouter (cấu hình qua `.env`)
- **Deployment:** Netlify (serverless functions) / Vercel

## Cấu trúc dự án

```
src/
├── pages/          # Các section chính (Intro, Background, Profile)
├── component/      # Components dùng chung (ChatBox, Navbar, Card...)
├── data/           # Dữ liệu tĩnh (projects, skills, info)
└── utils/          # Helpers (chat cache...)

netlify/functions/  # Serverless function xử lý AI chat
dev-api.js          # Local API server (mock netlify function cho dev)
```

## Cài đặt & Chạy

### 1. Cài dependencies

```bash
npm install
```

### 2. Cấu hình AI

Copy file env mẫu và điền API key:

```bash
cp .env.example .env
```

Chỉnh `.env`:

```env
# Chọn provider: "gemini" hoặc "openrouter"
AI_PROVIDER=openrouter

# Nếu dùng OpenRouter
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=google/gemini-2.0-flash-001

# Nếu dùng Gemini
GEMINI_API_KEY=...
```

### 3. Chạy dev

```bash
npm start
```

Lệnh này chạy đồng thời local API server (port 3002) và React app (port 3000).

Mở [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
```

Deploy lên **Netlify**: push lên git, Netlify tự detect `netlify.toml` và build.

Deploy lên **Vercel**: push lên git, Vercel detect `vercel.json` và build.

> Nhớ set environment variables (`AI_PROVIDER`, `OPENROUTER_API_KEY`...) trong dashboard của Netlify/Vercel.
