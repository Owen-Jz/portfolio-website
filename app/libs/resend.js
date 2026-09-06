import { Resend } from "resend";

/**
 * The client is built on first use rather than at module scope so that
 * `next build` can import routes that send email without RESEND_API_KEY
 * being present. Collecting page data imports every route module, and a
 * module-scope `new Resend(undefined)` throws there and fails the build.
 * The key is only genuinely needed when an email is actually sent.
 */
let client = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "Please define the RESEND_API_KEY environment variable inside .env.local"
    );
  }

  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY);
  }

  return client;
}

export default getResend;
