/**
 * Generates HTML email for new blog post notifications
 */
export function generateBlogNotificationHTML({ post, subscriberEmail }) {
  const postUrl = `https://owendigitals.com/blog/${post.slug}`;
  const unsubscribeUrl = `https://owendigitals.com/api/newsletter/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9;">
      <div style="background-color: #b02222; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Blog Post</h1>
      </div>

      <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
        ${post.image ? `
        <div style="margin-bottom: 20px; border-radius: 8px; overflow: hidden;">
          <img src="${post.image}" alt="${post.title}" style="width: 100%; height: auto; display: block;" />
        </div>
        ` : ""}

        <span style="display: inline-block; padding: 4px 12px; background-color: #fee2e2; color: #b02222; border-radius: 4px; font-size: 12px; font-weight: 600; margin-bottom: 12px;">
          ${post.category}
        </span>

        <h2 style="color: #1a1a1a; margin: 0 0 12px 0; font-size: 28px;">
          ${post.title}
        </h2>

        <div style="color: #666666; font-size: 14px; margin-bottom: 16px;">
          <span>${post.date}</span>
          <span style="margin: 0 8px;">•</span>
          <span>${post.readTime}</span>
        </div>

        <p style="color: #444444; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          ${post.excerpt}
        </p>

        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${postUrl}" style="display: inline-block; padding: 12px 32px; background-color: #b02222; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">
            Read Full Article
          </a>
        </div>

        <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 24px 0;" />

        <p style="color: #888888; font-size: 12px; text-align: center; margin: 0;">
          You're receiving this because you subscribed to Owen Digitals newsletter.
          <br />
          <a href="${unsubscribeUrl}" style="color: #b02222;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;
}

/**
 * Generates plain text version for email clients that don't support HTML
 */
export function generateBlogNotificationText({ post, subscriberEmail }) {
  const postUrl = `https://owendigitals.com/blog/${post.slug}`;
  const unsubscribeUrl = `https://owendigitals.com/api/newsletter/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`;

  return `
New Blog Post from Owen Digitals

${post.title}
${post.category} • ${post.date} • ${post.readTime}

${post.excerpt}

Read more: ${postUrl}

---

To unsubscribe, visit: ${unsubscribeUrl}
  `.trim();
}

/**
 * Generates HTML email for welcome/confirmation
 */
export function generateWelcomeEmail({ email }) {
  const blogUrl = "https://owendigitals.com/blog";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9;">
      <div style="background-color: #b02222; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">You're subscribed!</h1>
      </div>

      <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
        <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6;">
          Thanks for subscribing! You'll get notified whenever I publish new content on the blog.
        </p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="${blogUrl}" style="display: inline-block; padding: 12px 32px; background-color: #b02222; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">
            Read the Blog
          </a>
        </div>

        <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 24px 0;" />

        <p style="color: #888888; font-size: 12px; text-align: center; margin: 0;">
          You're receiving this because you subscribed to Owen Digitals newsletter.
          <br />
          <a href="${blogUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color: #b02222;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;
}