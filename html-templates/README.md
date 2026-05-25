# HTML Templates

Print-ready HTML templates styled with Owen Digitals branding.

## Files

| File | Purpose |
|------|---------|
| `invoice-template.html` | Filled invoice for Organ Station project |
| `proposal-brand-identity.html` | Brand identity proposal template |
| `proposal-web-dev.html` | Web development proposal template |
| `proposal-ui-ux.html` | UI/UX design proposal template |
| `service-agreement.html` | Master service agreement template |
| `sow-template.html` | Statement of work template |
| `nda.html` | Non-disclosure agreement template |
| `client-profile.html` | Client profile/record template |

## How to Use

1. Open any HTML file in a browser
2. Fill in the `[placeholder]` fields with actual client/project data
3. Print directly from browser (Ctrl+P / Cmd+P)
4. Or save as PDF for digital sending

## Branding Applied

- **Primary color**: #b02222 (red)
- **Secondary color**: #d38787
- **Background**: #0a0a0a (dark)
- **Font**: Manrope
- **Logo**: Embedded SVG from portfolio

## Customizing

All templates use inline CSS for easy modification. To change colors, edit the CSS variables at the top of each file:

```css
:root {
    --primary: #b02222;
    --secondary: #d38787;
    --bg: #0a0a0a;
    --surface: #151515;
    --text: #ffffff;
    --text-muted: rgba(255,255,255,0.6);
    --border: rgba(255,255,255,0.1);
}
```