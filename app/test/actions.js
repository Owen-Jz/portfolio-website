"use server";

import getResend from "../libs/resend";
import { generateContactNotificationEmail } from "../libs/email-templates";


export async function sendEmail(formData) {
  try {
    const name = formData.get("name");
    const subject = formData.get("subject");
    const information = formData.get("information");

    if (!name || !subject || !information) {
      return { success: false, message: "Please fill out all fields" };
    }

    const adminEmail = process.env.ADMIN_EMAIL || "owendigitals@gmail.com";
    const message = `Subject: ${subject}\n\n${information}`;

    await getResend().emails.send({
      from: "Contact Form <official@owendigitals.work>",
      to: adminEmail,
      subject: `New Contact Form Submission: ${subject}`,
      text: `New Contact Form Submission

Name: ${name}
Subject: ${subject}

Message:
${information}
`,
      html: generateContactNotificationEmail({
        name,
        email: adminEmail,
        message,
      }),
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
}
