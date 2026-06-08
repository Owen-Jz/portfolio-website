// ─────────────────────────────────────────────────────────────
//  Shared helpers
// ─────────────────────────────────────────────────────────────

const SITE_URL   = "https://owendigitals.work";
const FROM_NAME  = "Owen Digitals";
const YEAR       = new Date().getFullYear();

/** Wraps content in the full email shell with light/dark mode support */
function shell(content) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="dark only" />
  <meta name="supported-color-schemes" content="dark only" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

    /* Lock to a single dark theme. The brand is dark editorial, so we
       opt OUT of client light/dark switching and auto color inversion —
       this keeps the layout consistent across devices and keeps the
       brand red (#b02222) from being remixed into orange by Gmail/Apple. */
    :root {
      color-scheme: dark only;
      supported-color-schemes: dark only;
    }

    body {
      margin:0; padding:0; -webkit-text-size-adjust:100%;
      background-color:#080808;
    }

    * { box-sizing:border-box; }
    a { color:#b02222; }
    img { border:0; display:block; }

    .shell-bg { background-color:#080808; }
    .logo-text { color:#ffffff; }
    .accent-line-light { background-color:#1a1a1a; }
    .card-bg { background-color:#111111; border-color:#222222; }
    .footer-text { color:#333333; }

    /* Neutralize Gmail / Outlook.com dark-mode color remapping so the
       red accent never shifts toward orange. */
    u + .body .shell-bg { background-color:#080808 !important; }
    [data-ogsc] .logo-text { color:#ffffff !important; }
    [data-ogsc] .card-bg  { background-color:#111111 !important; }
  </style>
</head>
<body class="body" style="margin:0;padding:0;background-color:#080808;">
  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="width:100%;min-width:100%;">
    <tr class="shell-bg" style="background-color:#080808;">
      <td align="center" style="padding:48px 16px 40px;">

        <!-- Wrapper -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
               style="max-width:580px;width:100%;">

          <!-- ── Logo ── -->
          <tr>
            <td align="center" style="padding-bottom:36px;">
              <a href="${SITE_URL}" style="text-decoration:none;">
                <span class="logo-text" style="font-family:'Manrope',Arial,sans-serif;font-size:22px;font-weight:800;
                             letter-spacing:-0.5px;">
                  Owen&nbsp;<span style="color:#b02222;">Digitals</span>
                </span>
              </a>
            </td>
          </tr>

          <!-- ── Red accent line ── -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="33%" class="accent-line-light" style="height:1px;background-color:#1a1a1a;"></td>
                  <td width="34%" style="height:1px;background-color:#b02222;"></td>
                  <td width="33%" class="accent-line-light" style="height:1px;background-color:#1a1a1a;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Main card ── -->
          <tr>
            <td class="card-bg"
                style="background-color:#111111;border:1px solid #222222;border-top:none;
                       border-radius:0 0 20px 20px;">
              ${content}
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="padding-top:28px;text-align:center;">
              <p class="footer-text" style="font-family:'Manrope',Arial,sans-serif;font-size:11px;
                        margin:0;line-height:1.6;letter-spacing:0.3px;">
                © ${YEAR} ${FROM_NAME} · All rights reserved
              </p>
            </td>
          </tr>

        </table>
        <!-- /Wrapper -->

      </td>
    </tr>
  </table>
  <!--[if mso]></td></tr></table><![endif]-->
</body>
</html>`;
}

/** Standard red CTA button */
function ctaButton(href, label) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
    <tr>
      <td align="center" bgcolor="#b02222"
          style="background-color:#b02222;border-radius:10px;">
        <a href="${href}"
           style="display:inline-block;padding:14px 40px;font-family:'Manrope',Arial,sans-serif;
                  font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;
                  letter-spacing:0.2px;white-space:nowrap;">
          ${label}
        </a>
      </td>
    </tr>
  </table>`;
}

/** Thin divider line */
const divider = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="margin:32px 0 28px;">
    <tr><td style="height:1px;background-color:#222222;"></td></tr>
  </table>`;

/** Escape HTML special chars in user-supplied input */
function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Unsubscribe footer text */
function unsubscribeFooter(unsubscribeUrl) {
  return `
  <p style="font-family:'Manrope',Arial,sans-serif;color:#444444;font-size:12px;
            text-align:center;margin:0;line-height:1.7;">
    You're receiving this because you subscribed at
    <a href="${SITE_URL}" style="color:#555555;text-decoration:none;">owendigitals.work</a>
    <br />
    <a href="${unsubscribeUrl}"
       style="color:#555555;text-decoration:underline;">Unsubscribe</a>
  </p>`;
}


// ─────────────────────────────────────────────────────────────
//  1. Welcome Email
// ─────────────────────────────────────────────────────────────

export function generateWelcomeEmail({ email }) {
  const blogUrl        = `${SITE_URL}/blog`;
  const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;

  const content = `
    <!-- Top padding -->
    <div style="height:40px;"></div>

    <!-- Check icon -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding-bottom:24px;">
          <div style="display:inline-block;width:60px;height:60px;background-color:#b02222;
                      border-radius:50%;text-align:center;line-height:60px;
                      font-size:26px;color:#ffffff;">✓</div>
        </td>
      </tr>
    </table>

    <!-- Headline -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:0 40px 12px;">
          <h1 style="font-family:'Manrope',Arial,sans-serif;color:#ffffff;font-size:36px;
                     font-weight:800;margin:0;letter-spacing:-0.8px;line-height:1.1;">
            You're in.
          </h1>
        </td>
      </tr>
    </table>

    <!-- Subtext -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:0 48px 36px;">
          <p style="font-family:'Manrope',Arial,sans-serif;color:#777777;font-size:16px;
                    line-height:1.7;margin:0;text-align:center;">
            Welcome to the loop. You'll be the first to know when I publish
            something new — design breakdowns, business reflections, and
            build logs from the trenches.
          </p>
        </td>
      </tr>
    </table>

    <!-- What to expect card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px 36px;">
      <tr>
        <td bgcolor="#1a1a1a"
            style="background-color:#1a1a1a;border:1px solid #2a2a2a;border-radius:14px;
                   padding:24px 28px;">

          <p style="font-family:'Manrope',Arial,sans-serif;color:#b02222;font-size:10px;
                    font-weight:700;text-transform:uppercase;letter-spacing:2.5px;margin:0 0 18px;">
            What to expect
          </p>

          <!-- Perk 1 -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                 style="margin-bottom:14px;">
            <tr>
              <td width="20" valign="top" style="padding-top:6px;">
                <div style="width:6px;height:6px;background-color:#b02222;border-radius:50%;"></div>
              </td>
              <td style="font-family:'Manrope',Arial,sans-serif;color:#999999;font-size:14px;
                         line-height:1.5;">
                New article notifications, the moment they drop
              </td>
            </tr>
          </table>

          <!-- Perk 2 -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                 style="margin-bottom:14px;">
            <tr>
              <td width="20" valign="top" style="padding-top:6px;">
                <div style="width:6px;height:6px;background-color:#b02222;border-radius:50%;"></div>
              </td>
              <td style="font-family:'Manrope',Arial,sans-serif;color:#999999;font-size:14px;
                         line-height:1.5;">
                Design, business &amp; build-log deep dives
              </td>
            </tr>
          </table>

          <!-- Perk 3 -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="20" valign="top" style="padding-top:6px;">
                <div style="width:6px;height:6px;background-color:#b02222;border-radius:50%;"></div>
              </td>
              <td style="font-family:'Manrope',Arial,sans-serif;color:#999999;font-size:14px;
                         line-height:1.5;">
                Behind-the-scenes process breakdowns
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

    <!-- CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px 36px;">
      <tr>
        <td align="center">
          ${ctaButton(blogUrl, "Browse the Blog &nbsp;→")}
        </td>
      </tr>
    </table>

    ${divider.replace('style="margin:32px 0 28px;"',
      'style="margin:0 40px 28px;"')}

    <!-- Unsubscribe -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px 40px;">
      <tr>
        <td>
          ${unsubscribeFooter(unsubscribeUrl)}
        </td>
      </tr>
    </table>
  `;

  return shell(content);
}


// ─────────────────────────────────────────────────────────────
//  2. Blog Post Notification (HTML)
// ─────────────────────────────────────────────────────────────

export function generateBlogNotificationHTML({ post, subscriberEmail }) {
  const postUrl        = `${SITE_URL}/blog/${post.slug}`;
  const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`;

  const imageBlock = post.image ? `
    <!-- Post image (sits above card border) -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="max-width:580px;margin:0 auto;">
      <tr>
        <td style="border-radius:16px 16px 0 0;overflow:hidden;line-height:0;">
          <img src="${post.image}" alt="${post.title}"
               width="580" style="width:100%;max-width:580px;height:auto;
                                  display:block;border-radius:16px 16px 0 0;" />
        </td>
      </tr>
    </table>
  ` : "";

  const content = `
    <!-- NEW ARTICLE label -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:36px 40px 0;">
      <tr>
        <td>
          <span style="display:inline-block;padding:4px 14px;background-color:#1e0a0a;
                       color:#b02222;border:1px solid #b02222;border-radius:6px;
                       font-family:'Manrope',Arial,sans-serif;font-size:10px;
                       font-weight:700;text-transform:uppercase;letter-spacing:2px;">
            New Article
          </span>
          ${post.category ? `
          <span style="display:inline-block;padding:4px 14px;background-color:#1a1a1a;
                        color:#666666;border:1px solid #2a2a2a;border-radius:6px;
                        font-family:'Manrope',Arial,sans-serif;font-size:10px;
                        font-weight:600;text-transform:uppercase;letter-spacing:1.5px;
                        margin-left:8px;">
            ${post.category}
          </span>` : ""}
        </td>
      </tr>
    </table>

    <!-- Title -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:20px 40px 12px;">
      <tr>
        <td>
          <h1 style="font-family:'Manrope',Arial,sans-serif;color:#ffffff;font-size:30px;
                     font-weight:800;margin:0;letter-spacing:-0.6px;line-height:1.2;">
            ${post.title}
          </h1>
        </td>
      </tr>
    </table>

    <!-- Meta: date · read time -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px 24px;">
      <tr>
        <td>
          <p style="font-family:'Manrope',Arial,sans-serif;color:#555555;font-size:13px;
                    margin:0;letter-spacing:0.2px;">
            ${post.date || ""}${post.date && post.readTime ? '<span style="margin:0 8px;color:#333333;">·</span>' : ""}${post.readTime || ""}
          </p>
        </td>
      </tr>
    </table>

    <!-- Divider rule -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px;">
      <tr>
        <td style="height:1px;background-color:#222222;"></td>
      </tr>
    </table>

    <!-- Excerpt -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:28px 40px 32px;">
      <tr>
        <td>
          <!-- Left quote accent -->
          <div style="font-family:'Georgia',serif;font-size:48px;line-height:1;
                      color:#b02222;opacity:0.5;margin-bottom:-4px;">&ldquo;</div>
          <p style="font-family:'Manrope',Arial,sans-serif;color:#aaaaaa;font-size:16px;
                    line-height:1.75;margin:0;">
            ${post.excerpt}
          </p>
        </td>
      </tr>
    </table>

    <!-- CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px 36px;">
      <tr>
        <td align="left">
          ${ctaButton(postUrl, "Read the Article &nbsp;→")}
        </td>
      </tr>
    </table>

    ${divider.replace('style="margin:32px 0 28px;"',
      'style="margin:0 40px 28px;"')}

    <!-- Unsubscribe -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px 40px;">
      <tr>
        <td>
          ${unsubscribeFooter(unsubscribeUrl)}
        </td>
      </tr>
    </table>
  `;

  // If there's an image, we need to adjust the card's top border-radius
  if (post.image) {
    return shell(content).replace(
      "border-radius:0 0 20px 20px",
      "border-radius:0 0 20px 20px"
    );
  }
  return shell(content);
}


// ─────────────────────────────────────────────────────────────
//  3. Blog Post Notification (plain text fallback)
// ─────────────────────────────────────────────────────────────

export function generateBlogNotificationText({ post, subscriberEmail }) {
  const postUrl        = `${SITE_URL}/blog/${post.slug}`;
  const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`;

  return `
Owen Digitals — New Article
════════════════════════════

${post.title}
${post.category ? `${post.category}  ·  ` : ""}${post.date || ""}${post.readTime ? `  ·  ${post.readTime}` : ""}

${post.excerpt}

Read the full article:
${postUrl}

────────────────────────────
You're receiving this because you subscribed at owendigitals.work
To unsubscribe: ${unsubscribeUrl}
  `.trim();
}


// ─────────────────────────────────────────────────────────────
//  4. Contact Form → Admin Notification
// ─────────────────────────────────────────────────────────────

export function generateContactNotificationEmail({ name, email, message }) {
  const safeName    = escapeHtml(name);
  const safeEmail   = escapeHtml(email);
  const firstName   = safeName.split(" ")[0] || safeName;
  const messageHtml = escapeHtml(message).replace(/\r\n|\r|\n/g, "<br />");

  const content = `
    <!-- Top padding -->
    <div style="height:40px;"></div>

    <!-- Eyebrow -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px 14px;">
      <tr>
        <td>
          <span style="font-family:'Manrope',Arial,sans-serif;color:#b02222;font-size:10px;
                       font-weight:700;text-transform:uppercase;letter-spacing:2.5px;">
            New Message
          </span>
        </td>
      </tr>
    </table>

    <!-- Headline -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:0 40px 28px;">
          <h1 style="font-family:'Manrope',Arial,sans-serif;color:#ffffff;font-size:30px;
                     font-weight:800;margin:0;letter-spacing:-0.6px;line-height:1.2;">
            Someone reached out.
          </h1>
        </td>
      </tr>
    </table>

    <!-- Contact details -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px 8px;">
      <tr>
        <td style="padding-bottom:18px;">
          <p style="font-family:'Manrope',Arial,sans-serif;color:#b02222;font-size:10px;
                    font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px;">
            Name
          </p>
          <p style="font-family:'Manrope',Arial,sans-serif;color:#ffffff;font-size:16px;
                    font-weight:600;margin:0;line-height:1.5;">
            ${safeName}
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom:8px;">
          <p style="font-family:'Manrope',Arial,sans-serif;color:#b02222;font-size:10px;
                    font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px;">
            Email
          </p>
          <p style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;
                    font-size:14px;margin:0;line-height:1.5;">
            <a href="mailto:${safeEmail}" style="color:#999999;text-decoration:none;">${safeEmail}</a>
          </p>
        </td>
      </tr>
    </table>

    <!-- Message card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:18px 40px 36px;">
      <tr>
        <td bgcolor="#1a1a1a"
            style="background-color:#1a1a1a;border:1px solid #2a2a2a;border-radius:14px;
                   padding:24px 28px;">
          <p style="font-family:'Manrope',Arial,sans-serif;color:#b02222;font-size:10px;
                    font-weight:700;text-transform:uppercase;letter-spacing:2.5px;margin:0 0 14px;">
            Message
          </p>
          <p style="font-family:'Manrope',Arial,sans-serif;color:#cccccc;font-size:15px;
                    line-height:1.7;margin:0;">
            ${messageHtml}
          </p>
        </td>
      </tr>
    </table>

    <!-- CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px 40px;">
      <tr>
        <td align="left">
          ${ctaButton(`mailto:${safeEmail}`, `Reply to ${firstName} &nbsp;→`)}
        </td>
      </tr>
    </table>
  `;

  return shell(content);
}


// ─────────────────────────────────────────────────────────────
//  5. Project Brief → Admin Notification
// ─────────────────────────────────────────────────────────────

export function generateBriefNotificationEmail({ brief, type }) {
  const typeLabels = {
    website: "Website Design",
    branding: "Branding",
    "ui-ux": "UI/UX Design",
  };
  const typeLabel = typeLabels[type] || "Project";

  const safeName    = escapeHtml(brief.fullName);
  const safeEmail   = escapeHtml(brief.email);
  const firstName   = safeName.split(" ")[0] || safeName;

  // Contact rows: Name, Email, Company, Phone (Phone only if present)
  const contactRows = [
    ["Name", `<span style="color:#ffffff;font-weight:600;">${safeName}</span>`],
    ["Email",
      `<a href="mailto:${safeEmail}" style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;color:#999999;text-decoration:none;">${safeEmail}</a>`],
    ["Company",
      `<span style="color:#cccccc;">${escapeHtml(brief.companyName) || "Not provided"}</span>`],
  ];
  if (brief.phone) {
    contactRows.push(["Phone", `<span style="color:#cccccc;">${escapeHtml(brief.phone)}</span>`]);
  }

  const contactBlock = contactRows.map(([label, valueHtml]) => `
    <tr>
      <td style="padding:0 0 14px;">
        <p style="font-family:'Manrope',Arial,sans-serif;color:#b02222;font-size:10px;
                  font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px;">
          ${label}
        </p>
        <p style="font-family:'Manrope',Arial,sans-serif;font-size:15px;margin:0;line-height:1.5;">
          ${valueHtml}
        </p>
      </td>
    </tr>
  `).join("");

  // Descriptive fields → definition list
  const fieldMappings = [
    ["businessDescription", "Business Description"],
    ["projectPurpose", "Project Purpose"],
    ["targetAudience", "Target Audience"],
    ["style", "Preferred Style"],
    ["websitesLiked", "Websites Liked"],
    ["brandPerception", "Brand Perception"],
    ["voicePersonality", "Voice/Personality"],
    ["existingAssets", "Existing Assets"],
    ["brandGuidelines", "Brand Guidelines"],
    ["creativeFreedom", "Creative Freedom"],
    ["pagesNeeded", "Pages Needed"],
    ["features", "Features Required"],
    ["contentReady", "Content Ready"],
    ["mediaReady", "Media Ready"],
    ["animations", "Animations"],
    ["domainOwned", "Domain Owned"],
    ["domainDetails", "Domain Details"],
    ["timeline", "Timeline"],
    ["budget", "Budget"],
    ["additionalNotes", "Additional Notes"],
  ];

  const detailRows = fieldMappings
    .filter(([key]) => brief[key])
    .map(([key, label]) => `
      <tr>
        <td style="padding:0 0 18px;">
          <p style="font-family:'Manrope',Arial,sans-serif;color:#b02222;font-size:10px;
                    font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 5px;">
            ${label}
          </p>
          <p style="font-family:'Manrope',Arial,sans-serif;color:#cccccc;font-size:14px;
                    line-height:1.6;margin:0;">
            ${escapeHtml(brief[key]).replace(/\r\n|\r|\n/g, "<br />")}
          </p>
        </td>
      </tr>
    `).join("");

  const detailBlock = detailRows ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:24px 40px 8px;">
      <tr>
        <td bgcolor="#1a1a1a"
            style="background-color:#1a1a1a;border:1px solid #2a2a2a;border-radius:14px;
                   padding:24px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${detailRows}
          </table>
        </td>
      </tr>
    </table>
  ` : "";

  const content = `
    <!-- Top padding -->
    <div style="height:40px;"></div>

    <!-- Eyebrow -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px 14px;">
      <tr>
        <td>
          <span style="font-family:'Manrope',Arial,sans-serif;color:#b02222;font-size:10px;
                       font-weight:700;text-transform:uppercase;letter-spacing:2.5px;">
            New ${typeLabel} Brief
          </span>
        </td>
      </tr>
    </table>

    <!-- Headline -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:0 40px 6px;">
          <h1 style="font-family:'Manrope',Arial,sans-serif;color:#ffffff;font-size:30px;
                     font-weight:800;margin:0;letter-spacing:-0.6px;line-height:1.2;">
            ${safeName}
          </h1>
        </td>
      </tr>
    </table>

    <!-- Project type -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:0 40px 28px;">
          <p style="font-family:'Manrope',Arial,sans-serif;color:#777777;font-size:14px;
                    margin:0;line-height:1.5;">
            ${typeLabel}
          </p>
        </td>
      </tr>
    </table>

    <!-- Contact details -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:0 40px 0;">
      <tr>
        <td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${contactBlock}
          </table>
        </td>
      </tr>
    </table>

    ${detailBlock}

    <!-- CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="padding:28px 40px 40px;">
      <tr>
        <td align="left">
          ${ctaButton(`mailto:${safeEmail}`, `Reply to ${firstName} &nbsp;→`)}
        </td>
      </tr>
    </table>
  `;

  return shell(content);
}
