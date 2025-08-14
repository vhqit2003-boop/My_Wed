import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  let lang = searchParams.get("lang");
  if (!["vi","en"].includes(lang)) lang = "vi";

  const form = await request.formData();
  const name = (form.get("name") ?? "").toString().trim();
  const email = (form.get("email") ?? "").toString().trim();
  const message = (form.get("message") ?? "").toString().trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !message) {
    // 303 để đổi POST -> GET
    return NextResponse.redirect(new URL(`/?sent=0&lang=${lang}#lien-he`, request.url), 303);
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT, SMTP_SECURE, TO_EMAIL, TO_NAME } = process.env;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: (SMTP_SECURE ?? "false") === "true", // true = 465
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeName = esc(name), safeEmail = esc(email), safeMsg = esc(message).replace(/\n/g, "<br>");

  const subject = lang === "vi" ? `[Portfolio] Tin nhắn mới từ ${safeName}` : `[Portfolio] New message from ${safeName}`;
  const html = lang === "vi"
    ? `<p><strong>Họ tên:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Nội dung:</strong><br>${safeMsg}</p>`
    : `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong><br>${safeMsg}</p>`;
  const text = lang === "vi"
    ? `Họ tên: ${name}\nEmail: ${email}\n\nNội dung:\n${message}`
    : `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  try {
    await transporter.sendMail({
      from: { name: "Portfolio Contact", address: SMTP_USER },
      to:   { name: TO_NAME ?? "Admin", address: TO_EMAIL ?? SMTP_USER },
      replyTo: { name, address: email },
      subject, html, text,
    });

    // ✅ dùng 303 để về trang chủ với GET
    return NextResponse.redirect(new URL(`/?sent=1&lang=${lang}#lien-he`, request.url), 303);
  } catch (e) {
    console.error("MAIL_ERROR:", e);
    return NextResponse.redirect(new URL(`/?sent=0&lang=${lang}#lien-he`, request.url), 303);
  }
}
