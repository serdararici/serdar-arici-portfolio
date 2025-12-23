"use server"; // Bu dosya aslında server'da çalışacak ama Next.js 15 deseni için "use server" ekleyeceğiz

import { Resend } from 'resend';

// .env dosyasından API key'i alıyoruz
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { error: "Lütfen tüm alanları doldurun." };
  }

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Domain bağlayınca burayı güncellersin
      to: ['serdararici3@gmail.com'], // Kendi mail adresin
      subject: `New Message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return { success: true, data };
  } catch (error) {
    return { error: "Mesaj gönderilirken bir hata oluştu." };
  }
}