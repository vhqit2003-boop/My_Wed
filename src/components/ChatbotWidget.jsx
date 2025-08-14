"use client";
import { useEffect, useRef, useState } from "react";

export default function ChatbotWidget(){
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Chào bạn 👋 Mình có thể giúp gì? (ví dụ: hỏi về dự án/kĩ năng/cách liên hệ…)" }
  ]);
  const inputRef = useRef(null);

  useEffect(() => {
    const box = document.getElementById("chat-scroll");
    if (box) box.scrollTop = box.scrollHeight;
  }, [messages, loading, open]);

  async function sendMsg(){
    const content = inputRef.current?.value?.trim();
    if (!content) return;

    inputRef.current.value = "";
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setLoading(true);

    try {
      const r = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Gửi full lịch sử để giữ ngữ cảnh
        body: JSON.stringify({ messages: next }),
      });
      const data = await r.json();
      setMessages(m => [...m, { role: "assistant", content: data.reply ?? "Xin lỗi, mình chưa trả lời được." }]);
    } catch (e) {
      setMessages(m => [...m, { role: "assistant", content: "Có lỗi khi gọi AI." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={()=>setOpen(v=>!v)}
        className="fixed bottom-5 right-5 z-50 rounded-full btn-primary px-4 py-3 shadow-lg"
        aria-label="Open chat"
      >
        💬 Chat
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-80 max-h-[70vh] rounded-xl bg-white/5 backdrop-blur-md ring-1 ring-white/20 p-3 flex flex-col gap-2">
          <div className="font-semibold">Trợ lý ảo</div>

          <div id="chat-scroll" className="flex-1 overflow-auto space-y-2 pr-1">
            {messages.map((m, i) => (
              <div key={i} className={m.role==="user" ? "text-right" : "text-left"}>
                <div className={`inline-block px-3 py-2 rounded-lg ${m.role==="user" ? "bg-violet-600/80" : "bg-white/10"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-left text-sm opacity-70">Đang trả lời…</div>}
          </div>

          <div className="flex gap-2">
            <input
              ref={inputRef}
              onKeyDown={(e)=>e.key==="Enter"&&sendMsg()}
              className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-sm"
              placeholder="Nhập câu hỏi..." />
            <button onClick={sendMsg} className="btn-primary text-sm px-3">Gửi</button>
          </div>

          <div className="text-[11px] opacity-70">
            Mẹo: cần liên hệ nhanh? dùng mục <strong>Liên hệ</strong> ở trang chính.
          </div>
        </div>
      )}
    </>
  );
}
