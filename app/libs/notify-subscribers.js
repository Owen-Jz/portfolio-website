import { Resend } from "resend";
import Subscriber from "../models/Subscriber";
import {
  generateBlogNotificationHTML,
  generateBlogNotificationText,
} from "./email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 1000;

/**
 * Notifies all active newsletter subscribers about a blog post.
 *
 * Sends in batches of 10 with a 1s delay between batches, using the same
 * from address, subject, and HTML/text templates as the admin notify route.
 *
 * @param {object} post - a BlogPost document (must have title, slug, etc.)
 * @returns {Promise<{ notified: number, failed: number, total: number }>}
 */
export async function notifySubscribers(post) {
  const subscribers = await Subscriber.find({ status: "active" }).lean();

  if (subscribers.length === 0) {
    return { notified: 0, failed: 0, total: 0 };
  }

  const adminEmail = process.env.ADMIN_EMAIL || "owendigitals@gmail.com";

  let notified = 0;
  let failed = 0;

  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);

    const emailPromises = batch.map((subscriber) =>
      resend.emails
        .send({
          from: "Owen Digitals <official@owendigitals.work>",
          to: subscriber.email,
          reply_to: adminEmail,
          subject: `New Post: ${post.title}`,
          html: generateBlogNotificationHTML({ post, subscriberEmail: subscriber.email }),
          text: generateBlogNotificationText({ post, subscriberEmail: subscriber.email }),
        })
        .then((result) => {
          // Resend resolves with { data, error } on API failures instead of throwing,
          // so a falsy data / populated error means the email did NOT go out.
          if (result?.error || !result?.data) {
            console.error(`Failed to notify ${subscriber.email}:`, result?.error ?? "no data returned");
            failed++;
          } else {
            notified++;
          }
        })
        .catch((err) => {
          console.error(`Failed to notify ${subscriber.email}:`, err);
          failed++;
        })
    );

    await Promise.allSettled(emailPromises);

    if (i + BATCH_SIZE < subscribers.length) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  return { notified, failed, total: subscribers.length };
}
