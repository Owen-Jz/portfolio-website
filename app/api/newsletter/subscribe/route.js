import { NextResponse } from "next/server";
import connectDB from "../../../libs/db";
import Subscriber from "../../../models/Subscriber";
import { Resend } from "resend";
import { generateWelcomeEmail } from "../../../libs/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    await connectDB();

    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await Subscriber.findOne({ email: normalizedEmail });

    if (existing) {
      if (existing.status === "unsubscribed") {
        existing.status = "active";
        existing.unsubscribedAt = null;
        existing.subscribedAt = new Date();
        await existing.save();

        // Send welcome back email
        await resend.emails.send({
          from: "Owen Digitals <official@owendigitals.work>",
          to: normalizedEmail,
          subject: "You're back! You're subscribed to Owen Digitals",
          html: generateWelcomeEmail({ email: normalizedEmail }),
        });

        return NextResponse.json(
          { success: true, message: "Welcome back! You've been re-subscribed." },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { success: false, error: "You're already subscribed!" },
        { status: 400 }
      );
    }

    const subscriber = await Subscriber.create({
      email: normalizedEmail,
      name: name?.trim() || null,
    });

    // Send welcome email
    await resend.emails.send({
      from: "Owen Digitals <official@owendigitals.work>",
      to: normalizedEmail,
      subject: "You're subscribed to Owen Digitals",
      html: generateWelcomeEmail({ email: normalizedEmail }),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed!",
        data: { email: subscriber.email, subscribedAt: subscriber.subscribedAt }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}