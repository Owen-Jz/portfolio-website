import { Resend } from "resend";

const resend = new Resend("re_2AnCqZ45_CK418WkPPAKs4hfej36ivP8v");

async function testContactForm() {
  const visitorEmail = "visitor@example.com";
  const visitorName = "John Doe";
  const visitorMessage = "Hi Owen, I'm interested in working with you on a web development project. Please let me know your availability.";

  try {
    const result = await resend.emails.send({
      from: "Contact Form <noreply@owendigitals.work>",
      to: "owendigitals@gmail.com",
      reply_to: visitorEmail,
      subject: `New Contact Form Submission from ${visitorName}`,
      text: `
Name: ${visitorName}
Email: ${visitorEmail}
Message: ${visitorMessage}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #b02222; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
            <p style="margin: 0 0 15px 0;"><strong>Name:</strong> ${visitorName}</p>
            <p style="margin: 0 0 15px 0;"><strong>Email:</strong> ${visitorEmail}</p>
            <p style="margin: 0 0 15px 0;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${visitorMessage}</p>
          </div>
        </div>
      `,
    });

    console.log("Contact form email sent successfully!");
    console.log("Response:", JSON.stringify(result, null, 2));
    console.log("\nYou should be able to reply directly to the visitor's email.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

testContactForm();
