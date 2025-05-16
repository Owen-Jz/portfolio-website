"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData) {
  try {
    const name = formData.name;
    const email = formData.email;
    const message = formData.message;

    // Check if all fields are filled
    if (!name || !email || !message) {
      return { success: false, message: "Please fill out all fields" };
    }

    // Set up the email sender
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e0e0e0; margin: 20px auto;">
            <tr>
              <td style="background-color: #b02222; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 10px 0; font-size: 16px; color: #333333;">
                      <strong>Name:</strong> ${name}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-size: 16px; color: #333333;">
                      <strong>Email:</strong> ${email}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-size: 16px; color: #333333;">
                      <strong>Message:</strong>
                      <p style="margin: 5px 0; color: #555555; line-height: 1.5;">${message}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888888;">
                <p style="margin: 0;">Sent from Owen Digitals Contact Form</p>
                <p style="margin: 5px 0;">&copy; ${new Date().getFullYear()} Owen Digitals. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
}
