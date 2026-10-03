"""Check the generated site without a browser or network."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from collections import Counter
import json

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ''
        self.in_title = False
        self.h1 = 0
        self.description = ''
        self.robots = ''
        self.refs = []
        self.ids = []
        self.labels = []
        self.inputs = []
        self.images = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title': self.in_title = True
        if tag == 'h1': self.h1 += 1
        if tag == 'meta' and a.get('name') == 'description': self.description = a.get('content', '')
        if tag == 'meta' and a.get('name') == 'robots': self.robots = a.get('content', '')
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'label' and 'for' in a: self.labels.append(a['for'])
        if tag in ('input', 'select', 'textarea'): self.inputs.append(a)
        if tag == 'img': self.images.append(a)
        for key in ('href','src'):
            if key in a: self.refs.append((tag, a[key]))
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
    def handle_data(self, data):
        if self.in_title: self.title += data

pages = {}
issues = []
for file in DIST.rglob('*.html'):
    page = Page()
    page.feed(file.read_text(encoding='utf-8'))
    pages[file.relative_to(DIST).as_posix()] = page
    if not page.title or not page.description: issues.append(f'{file}: missing metadata')
    if 'noindex' not in page.robots: issues.append(f'{file}: provisional build must be noindex')
    if len(page.ids) != len(set(page.ids)): issues.append(f'{file}: duplicate IDs')
    # The confirmation route contains a hidden receipt view and an alternative,
    # with exactly one visible H1 at runtime. All ordinary pages need a single H1.
    expected_h1 = 2 if 'solicitud-recibida' in str(file) else 1
    if page.h1 != expected_h1: issues.append(f'{file}: {page.h1} H1 elements (expected {expected_h1})')
    for input in page.inputs:
        if input.get('type') == 'hidden': continue
        if input.get('id') not in page.labels and not input.get('aria-label'):
            issues.append(f'{file}: unlabelled input {input.get("id")}')
    for img in page.images:
        if 'alt' not in img or not img.get('width') or not img.get('height'):
            issues.append(f'{file}: missing image alt/dimensions: {img.get("src")}')

for relative, page in pages.items():
    for tag, ref in page.refs:
        parsed = urlsplit(ref)
        if parsed.scheme or parsed.netloc: continue
        path = unquote(parsed.path)
        target = (DIST / path.lstrip('/')) if path.startswith('/') else (DIST / relative).parent / path
        if not path: target = DIST / relative
        if target.is_dir(): target /= 'index.html'
        if not target.exists():
            issues.append(f'{relative}: broken {tag} reference {ref}')
        elif parsed.fragment and target.suffix == '.html':
            target_key = target.relative_to(DIST).as_posix()
            if target_key in pages and unquote(parsed.fragment) not in pages[target_key].ids:
                issues.append(f'{relative}: missing anchor {ref}')

titles = Counter(p.title for p in pages.values())
if any(count > 1 for count in titles.values()): issues.append('Duplicate page titles')
descriptions = Counter(p.description for p in pages.values())
if any(count > 1 for count in descriptions.values()): issues.append('Duplicate page descriptions')
if list((DIST / 'demo').rglob('*.html')): issues.append('Development demo included in production')
robots = (DIST / 'robots.txt').read_text(encoding='utf-8')
if 'Disallow: /' not in robots: issues.append('Provisional robots is not blocked')
sitemap = (DIST / 'sitemap.xml').read_text(encoding='utf-8')
if '<loc>' in sitemap: issues.append('Provisional sitemap contains unverified domain URLs')

report = {'pages':len(pages),'local_links_and_assets':sum(len(p.refs) for p in pages.values()),'issues':issues}
output = ROOT / 'docs' / 'verification'
output.mkdir(parents=True, exist_ok=True)
(output / 'static-checks.json').write_text(json.dumps(report, ensure_ascii=False, indent=2),encoding='utf-8')
print(json.dumps(report, ensure_ascii=True, indent=2))
raise SystemExit(bool(issues))
