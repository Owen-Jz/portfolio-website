import asyncio
from playwright.async_api import async_playwright

async def convert_html_to_pdf(html_input_path, pdf_output_path):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(f"file://{html_input_path}", wait_until="networkidle")
        await page.emulate_media(media="print")
        await page.pdf(
            path=pdf_output_path,
            format="A4",
            print_background=True,
            margin={"top": "20mm", "bottom": "20mm", "left": "20mm", "right": "20mm"},
            display_header_footer=False,
            prefer_css_page_size=True
        )
        await browser.close()
        print(f"Successfully converted {html_input_path} to {pdf_output_path}")

if __name__ == "__main__":
    import sys
    asyncio.run(convert_html_to_pdf(sys.argv[1], sys.argv[2]))