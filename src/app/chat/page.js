"use client";
import { useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);

    setInput("");

    const res = await fetch("/api/ai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMsg = { role: "assistant", content: data.reply };

    setMessages(prev => [...prev, botMsg]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chatbot AI</h1>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ margin: "5px 0" }}>
            <b>{msg.role === "user" ? "Bạn" : "Bot"}:</b> {msg.content}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          style={{ width: "80%", padding: "5px" }}
        />
        <button onClick={sendMessage} style={{ padding: "5px 10px" }}>Gửi</button>
      </div>
    </div>
  );
}
