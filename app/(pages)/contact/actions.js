"use server";

import getResend from "../../libs/resend";
import { generateContactNotificationEmail } from "../../libs/email-templates";


export async function sendEmail(formData) {
  const { name, email, message } = formData;

  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please provide a valid email address.",
    };
  }

  try {
    await getResend().emails.send({
      from: "Contact Form <official@owendigitals.work>",
      to: process.env.ADMIN_EMAIL || "owendigitals@gmail.com",
      reply_to: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
`,
      html: generateContactNotificationEmail({ name, email, message }),
    });

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    };
  }
}
