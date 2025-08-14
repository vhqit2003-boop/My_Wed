import OpenAI from "openai";

export const runtime = "nodejs";

/** Khởi tạo client với Project API key */
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID,       // bắt buộc với sk-proj
  organization: process.env.OPENAI_ORG_ID || undefined, // nên có
});

function trimHistory(arr = [], limit = 12) {
  // chuẩn hoá & giới hạn độ dài tin nhắn để tránh abuse
  return arr
    .map((m) => ({
      role: m?.role === "user" ? "user" : m?.role === "assistant" ? "assistant" : "system",
      content: String(m?.content || "").slice(0, 2000),
    }))
    .slice(-limit);
}

export async function POST(req) {
  try {
    const payload = await req.json();

    // Chấp nhận { message: "..." } HOẶC { messages: [...] }
    let history = Array.isArray(payload?.messages) ? payload.messages : [];
    if (!history.length && typeof payload?.message === "string") {
      history = [{ role: "user", content: payload.message }];
    }

    history = trimHistory(history);

    if (!history.length) {
      return Response.json({ reply: "Bạn chưa nhập tin nhắn." });
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "Bạn là chatbot thân thiện trên website portfolio của Vũ Hải Quân. " +
            "Trả lời ngắn gọn, tiếng Việt tự nhiên. Nếu người dùng hỏi cách liên hệ, " +
            "hãy hướng dẫn dùng mục 'Liên hệ' trên trang.",
        },
        ...history,
    ]});

    const reply = completion?.choices?.[0]?.message?.content?.trim();
    return Response.json({ reply: reply || "Xin lỗi, mình chưa trả lời được." });

  } catch (err) {
    // Log chi tiết ở server; trả gọn ra client
    console.error("OpenAI API Error:", err);
    return Response.json({ reply: "Lỗi khi gọi AI (kiểm tra API key/model/quota)." }, { status: 200 });
  }
}
