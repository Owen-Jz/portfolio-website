import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.error("Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return res
      .status(500)
      .json({ error: "Server configuration error: Missing API key" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.error("Missing fields:", { name, email, message });
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with verified domain email (e.g., noreply@owendigitals.work)
      to: "owendigitals@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    if (error) {
      console.error("Resend API error:", JSON.stringify(error, null, 2));
      return res
        .status(500)
        .json({ error: `Failed to send email: ${error.message}` });
    }

    console.log("Email sent successfully:", data);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(
      "Unexpected error in send.js:",
      JSON.stringify(error, null, 2)
    );
    return res
      .status(500)
      .json({ error: "Failed to send email: Unexpected server error" });
  }
}
