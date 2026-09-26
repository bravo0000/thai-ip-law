# -*- coding: utf-8 -*-
import os
import sys
import subprocess
from markdown_it import MarkdownIt

# CSS template for professional legal exam study notes
CSS_STYLE = """
@import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Fira+Code:wght@400;500&display=swap');

@page {
    size: A4 portrait;
    margin: 16mm 16mm 18mm 16mm;
}

*, *:before, *:after {
    box-sizing: border-box;
}

body {
    font-family: 'Sarabun', 'Leelawadee UI', 'Tahoma', 'Segoe UI', sans-serif;
    font-size: 10.5pt;
    line-height: 1.65;
    color: #1e293b;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
}

/* Headings */
h1 {
    font-size: 19pt;
    font-weight: 700;
    color: #0f2b5c;
    border-bottom: 2.5px solid #2563eb;
    padding-bottom: 8px;
    margin-top: 0;
    margin-bottom: 14px;
    line-height: 1.35;
    break-after: avoid;
}

h2 {
    font-size: 14.5pt;
    font-weight: 700;
    color: #1e3a8a;
    border-bottom: 1.5px solid #cbd5e1;
    padding-bottom: 5px;
    margin-top: 22px;
    margin-bottom: 12px;
    line-height: 1.35;
    break-after: avoid;
}

h3 {
    font-size: 12.5pt;
    font-weight: 600;
    color: #1d4ed8;
    margin-top: 18px;
    margin-bottom: 8px;
    line-height: 1.4;
    break-after: avoid;
}

h4 {
    font-size: 11pt;
    font-weight: 600;
    color: #334155;
    margin-top: 14px;
    margin-bottom: 6px;
    line-height: 1.4;
    break-after: avoid;
}

h5 {
    font-size: 10.5pt;
    font-weight: 600;
    color: #475569;
    margin-top: 10px;
    margin-bottom: 4px;
    break-after: avoid;
}

p {
    margin-top: 0;
    margin-bottom: 8px;
    text-align: justify;
}

/* Lists */
ul, ol {
    margin-top: 4px;
    margin-bottom: 10px;
    padding-left: 24px;
}

li {
    margin-bottom: 4px;
}

li > ul, li > ol {
    margin-top: 2px;
    margin-bottom: 4px;
}

/* Blockquotes */
blockquote {
    background: #f8fafc;
    border-left: 4.5px solid #2563eb;
    border-radius: 0 8px 8px 0;
    padding: 10px 14px;
    margin: 10px 0;
    color: #1e293b;
    page-break-inside: avoid;
    break-inside: avoid;
}

blockquote > p:last-child {
    margin-bottom: 0;
}

/* Code & Pre */
pre {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 12px 14px;
    font-size: 9.5pt;
    font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
    line-height: 1.45;
    white-space: pre-wrap;
    word-break: break-word;
    margin: 12px 0;
    page-break-inside: avoid;
    break-inside: avoid;
    color: #0f172a;
}

code:not(pre code) {
    background: #eff6ff;
    color: #1d4ed8;
    padding: 1.5px 5px;
    border-radius: 4px;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 9pt;
    border: 1px solid #dbeafe;
}

/* Tables */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 9.5pt;
    line-height: 1.5;
    page-break-inside: avoid;
    break-inside: avoid;
}

th {
    background: #1e3a8a;
    color: #ffffff;
    padding: 8px 10px;
    font-weight: 600;
    text-align: left;
    border: 1px solid #1e3a8a;
}

td {
    padding: 8px 10px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
}

tr:nth-child(even) td {
    background-color: #f8fafc;
}

/* Dividers */
hr {
    border: none;
    border-top: 1.5px dashed #cbd5e1;
    margin: 18px 0;
}

/* Strong & Em */
strong {
    font-weight: 700;
    color: #091e42;
}

em {
    font-style: italic;
    color: #334155;
}

/* Prevent awkward page cuts */
.no-break {
    page-break-inside: avoid;
    break-inside: avoid;
}
"""

def md_to_html(md_path, html_path, title):
    with open(md_path, 'r', encoding='utf-8') as f:
        md_text = f.read()

    md = MarkdownIt('gfm-like', {'linkify': False, 'html': True})
    html_body = md.render(md_text)

    full_html = f"""<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<style>
{CSS_STYLE}
</style>
</head>
<body>
{html_body}
</body>
</html>
"""
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(full_html)
    return html_path

def convert_html_to_pdf(html_path, pdf_path):
    chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    if not os.path.exists(chrome_path):
        chrome_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

    abs_html = os.path.abspath(html_path)
    abs_pdf = os.path.abspath(pdf_path)

    cmd = [
        chrome_path,
        '--headless=new',
        '--disable-gpu',
        '--no-pdf-header-footer',
        '--run-all-compositor-stages-before-draw',
        f'--print-to-pdf={abs_pdf}',
        abs_html
    ]
    proc = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if proc.returncode == 0 and os.path.exists(abs_pdf):
        print(f"SUCCESS: {pdf_path} (Size: {os.path.getsize(abs_pdf)} bytes)")
        return True
    else:
        print(f"FAILED: {pdf_path}")
        return False

def main():
    base_dir = r"C:\Users\Momo\OneDrive - Nakhon Phanom University\app\เตรียมสอบ\กฏหมายลิขสิทธิ สอบ 26-9-69\Doc"
    
    files = [
        "สรุปเร่งรัด_ข้อ1_สิทธิบัตร.md",
        "สรุปเร่งรัด_ข้อ2_สิทธิบัตร.md",
        "สรุปเร่งรัด_ข้อ3_เครื่องหมายการค้า.md"
    ]

    for fname in files:
        md_file = os.path.join(base_dir, fname)
        prefix = os.path.splitext(fname)[0]
        html_file = os.path.join(base_dir, prefix + ".html")
        pdf_file = os.path.join(base_dir, prefix + ".pdf")

        print(f"Converting {fname}...")
        md_to_html(md_file, html_file, prefix)
        convert_html_to_pdf(html_file, pdf_file)

if __name__ == '__main__':
    main()
