import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GREETING =
  "Xin chào! Tôi là AI assistant của Luân. Bạn có thể hỏi tôi về kỹ năng, dự án, kinh nghiệm hoặc thông tin liên hệ của Luân nhé! 😊";

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-primaryMed"
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm font-mono break-words whitespace-pre-wrap leading-relaxed ${
          isUser
            ? "bg-primary/25 border border-primary/40 text-primaryPale rounded-br-sm"
            : "bg-surfaceElevated border border-border/30 text-primaryPale rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

let msgIdCounter = 0;
function makeMsg(role, content) {
  return { id: ++msgIdCounter, role, content };
}

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasGreeted = useRef(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const isComposing = useRef(false);

  // Listen for external open trigger (e.g. "My AI Assistant" button in Profile)
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  useEffect(() => {
    if (isOpen && !hasGreeted.current) {
      hasGreeted.current = true;
      setMessages([makeMsg("assistant", GREETING)]);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMsg = makeMsg("user", text);
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    // Reset textarea height về mặc định sau khi clear
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
    setIsLoading(true);

    try {
      const history = [...messages, userMsg];
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-20) }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages((prev) => [...prev, makeMsg("assistant", data.reply)]);
    } catch {
      setMessages((prev) => [
        ...prev,
        makeMsg(
          "assistant",
          "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau nhé!",
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey && !isComposing.current) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  return (
    <>
      {/* Toggle button + pulse rings */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Relative wrapper giữ pulse rings đúng vị trí */}
        <div className="relative w-14 h-14">
          {/* Pulse rings — chỉ hiện khi panel đóng */}
          <AnimatePresence>
            {!isOpen && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full bg-primaryMed/25 pointer-events-none"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 2, opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", repeatDelay: 0.3 }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full bg-primaryMed/15 pointer-events-none"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 2.7, opacity: [0, 0.35, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, delay: 0.5, ease: "easeOut", repeatDelay: 0.3 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.button
            onClick={() => setIsOpen((v) => !v)}
            className="relative w-14 h-14 rounded-full bg-primaryMed hover:bg-primaryLight text-surface shadow-lg shadow-primaryMed/40 flex items-center justify-center transition-colors duration-200"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 16, stiffness: 180, delay: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label={isOpen ? "Đóng chat" : "Mở chat AI"}
          >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </motion.svg>
            ) : (
              <motion.svg
                key="robot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Robot head */}
                <rect x="3" y="8" width="18" height="12" rx="3" />
                {/* Antenna */}
                <line x1="12" y1="8" x2="12" y2="4" />
                <circle cx="12" cy="3.5" r="1.5" fill="currentColor" />
                {/* Eyes */}
                <circle cx="9" cy="13" r="1.5" fill="currentColor" />
                <circle cx="15" cy="13" r="1.5" fill="currentColor" />
                {/* Mouth */}
                <path d="M9 17h6" strokeWidth="2" />
                {/* Ears */}
                <line x1="3" y1="14" x2="1" y2="14" />
                <line x1="21" y1="14" x2="23" y2="14" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
        </div>
      </div>

      {/* Slide-in panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-screen z-40 flex flex-col"
            style={{ width: "min(380px, 100vw)" }}
          >
            {/* Backdrop blur + border */}
            <div className="flex flex-col h-full bg-surface/95 border-l border-border/40 backdrop-blur-md shadow-2xl shadow-black/50">
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3.5 bg-surfaceElevated border-b border-border/40 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primaryMed/20 border border-primaryMed/40 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F5C857"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-primaryPale font-mono text-sm font-semibold leading-tight">
                    Luân's AI Assistant
                  </p>
                  <p className="text-primaryLight/60 font-mono text-xs">
                    Hỏi về CV của Luân
                  </p>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-primaryLight/50 hover:text-primaryLight transition-colors p-1 rounded-lg hover:bg-primary/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Đóng chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              </div>

              {/* Message list */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-surfaceElevated border border-border/30 rounded-2xl rounded-bl-sm">
                      <TypingDots />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input area */}
              <div className="flex-shrink-0 px-4 py-3.5 border-t border-border/40 bg-surfaceElevated">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onCompositionStart={() => { isComposing.current = true; }}
                    onCompositionEnd={() => { isComposing.current = false; }}
                    placeholder="vd: kỹ năng, dự án, email..."
                    rows={1}
                    className={`flex-1 resize-none bg-surface rounded-xl px-3.5 py-2.5 text-sm font-mono text-primaryPale placeholder-primaryLight/30 focus:outline-none transition-colors duration-200 leading-relaxed border ${
                      inputValue.length > 20
                        ? "border-red-500/70 focus:border-red-500"
                        : "border-border/50 focus:border-primary/70"
                    }`}
                    style={{ maxHeight: "120px", overflowY: "auto" }}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height =
                        Math.min(e.target.scrollHeight, 120) + "px";
                    }}
                  />
                  <motion.button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-primaryMed hover:bg-primaryLight disabled:opacity-40 disabled:cursor-not-allowed text-surface flex items-center justify-center transition-colors duration-200"
                    whileHover={{
                      scale: inputValue.trim() && !isLoading ? 1.05 : 1,
                    }}
                    whileTap={{
                      scale: inputValue.trim() && !isLoading ? 0.95 : 1,
                    }}
                    aria-label="Gửi tin nhắn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </motion.button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-primaryLight/25 font-mono text-xs">
                    Enter để gửi · Shift+Enter xuống dòng
                  </p>
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      inputValue.length > 20 ? "text-red-400" : "text-primaryLight/30"
                    }`}
                  >
                    {inputValue.length}/20
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
