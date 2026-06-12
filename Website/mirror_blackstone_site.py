from __future__ import annotations

import os
import re
from collections import deque
from html import unescape
from pathlib import Path
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse, urlunparse
from urllib.request import Request, urlopen

BASE_URL = "https://aeplica.com/blackstone-website"
BASE_HOST = urlparse(BASE_URL).netloc
OUTPUT_ROOT = Path(r"c:\Users\Cleo\Desktop\SHITIBUILT\Blackstone\Website\aeplica-blackstone-website")
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
)

HTML_URL_ATTR_RE = re.compile(
    r"(?P<attr>\b(?:href|src|action|poster|data-src|data-href))=(?P<quote>['\"])(?P<url>.*?)(?P=quote)",
    re.IGNORECASE | re.DOTALL,
)
SRCSET_RE = re.compile(r"(?P<attr>\bsrcset)=(?P<quote>['\"])(?P<value>.*?)(?P=quote)", re.IGNORECASE | re.DOTALL)
CSS_URL_RE = re.compile(r"url\((?P<quote>['\"]?)(?P<url>[^)'\"]+)(?P=quote)\)", re.IGNORECASE)
CSS_IMPORT_RE = re.compile(r"@import\s+(?:url\()?(?P<quote>['\"]?)(?P<url>[^;'\")]+)(?P=quote)\)?", re.IGNORECASE)
JS_ASSET_REF_RE = re.compile(r"(?P<quote>['\"])(?P<url>/blackstone-website/assets/[^'\"]+)(?P=quote)")


def normalize_url(raw_url: str, base_url: str | None = None) -> str:
    absolute_url = urljoin(base_url or BASE_URL, raw_url)
    parsed = urlparse(absolute_url)
    parsed = parsed._replace(fragment="", query="")
    return urlunparse(parsed)


def is_internal(url: str) -> bool:
    parsed = urlparse(url)
    return parsed.scheme in {"http", "https"} and parsed.netloc == BASE_HOST and parsed.path.startswith("/blackstone-website")


def local_path_for_url(url: str) -> Path:
    parsed = urlparse(url)
    path = parsed.path
    if not path.startswith("/blackstone-website"):
        raise ValueError(f"Unexpected path outside target site: {url}")

    relative_path = path[len("/blackstone-website"):].lstrip("/")
    if not relative_path or relative_path.endswith("/"):
        relative_path = relative_path + "index.html"
    elif "." not in Path(relative_path).name:
        relative_path = relative_path + "/index.html"

    return OUTPUT_ROOT / relative_path


def is_textual_extension(path: str) -> bool:
    return Path(path).suffix.lower() in {
        ".html",
        ".htm",
        ".css",
        ".js",
        ".mjs",
        ".json",
        ".xml",
        ".svg",
        ".txt",
        ".map",
        ".webmanifest",
    }


def should_fetch(url: str) -> bool:
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"}:
        return False
    if parsed.netloc != BASE_HOST:
        return False
    return parsed.path.startswith("/blackstone-website")


def fetch(url: str) -> tuple[bytes, str, str]:
    request = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"})
    with urlopen(request, timeout=30) as response:
        data = response.read()
        content_type = response.headers.get_content_type()
        final_url = response.geturl()
        return data, content_type, final_url


def decode_text(data: bytes, content_type: str) -> str:
    charset_match = re.search(r"charset=([A-Za-z0-9._-]+)", content_type or "", re.IGNORECASE)
    charset = charset_match.group(1) if charset_match else "utf-8"
    try:
        return data.decode(charset, errors="replace")
    except LookupError:
        return data.decode("utf-8", errors="replace")


def ensure_parent(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def page_dir_for_url(url: str) -> Path:
    return local_path_for_url(url).parent


def relative_target(current_url: str, target_url: str) -> str:
    current_dir = page_dir_for_url(current_url)
    target_path = local_path_for_url(target_url)
    relative = os.path.relpath(target_path, current_dir).replace(os.sep, "/")
    parsed_target = urlparse(target_url)
    if parsed_target.fragment:
        relative = f"{relative}#{parsed_target.fragment}"
    return relative


def rewrite_srcset(value: str, current_url: str, discovered: set[str]) -> str:
    parts: list[str] = []
    for entry in value.split(","):
        item = entry.strip()
        if not item:
            continue
        tokens = item.split()
        raw_url = tokens[0]
        descriptor = " ".join(tokens[1:])
        absolute_url = normalize_url(raw_url, current_url)
        if should_fetch(absolute_url):
            discovered.add(absolute_url)
            raw_url = relative_target(current_url, absolute_url)
        rebuilt = raw_url if not descriptor else f"{raw_url} {descriptor}"
        parts.append(rebuilt)
    return ", ".join(parts)


def rewrite_text_urls(text: str, current_url: str, discovered: set[str]) -> str:
    def replace_url(match: re.Match[str]) -> str:
        raw_url = match.group("url").strip()
        absolute_url = normalize_url(raw_url, current_url)
        if should_fetch(absolute_url):
            discovered.add(absolute_url)
            raw_url = relative_target(current_url, absolute_url)
        quote = match.group("quote") or ""
        return f"url({quote}{raw_url}{quote})"

    def replace_import(match: re.Match[str]) -> str:
        raw_url = match.group("url").strip()
        absolute_url = normalize_url(raw_url, current_url)
        if should_fetch(absolute_url):
            discovered.add(absolute_url)
            raw_url = relative_target(current_url, absolute_url)
        quote = match.group("quote") or ""
        prefix = "@import url(" if match.group(0).lower().startswith("@import url(") else "@import "
        if prefix.endswith("url("):
            return f"@import url({quote}{raw_url}{quote})"
        return f"@import {quote}{raw_url}{quote}"

    text = CSS_URL_RE.sub(replace_url, text)
    text = CSS_IMPORT_RE.sub(replace_import, text)
    return text


def rewrite_js_assets(text: str, current_url: str, discovered: set[str]) -> str:
    def replace_asset(match: re.Match[str]) -> str:
        absolute_url = normalize_url(match.group("url"), current_url)
        if should_fetch(absolute_url):
            discovered.add(absolute_url)
            relative_url = relative_target(current_url, absolute_url)
            return f'{match.group("quote")}{relative_url}{match.group("quote")}'
        return match.group(0)

    return JS_ASSET_REF_RE.sub(replace_asset, text)


def rewrite_html(html: str, current_url: str, discovered: set[str]) -> str:
    def replace_attr(match: re.Match[str]) -> str:
        attr = match.group("attr")
        quote = match.group("quote")
        raw_url = match.group("url")
        stripped = raw_url.strip()
        if stripped.startswith(("mailto:", "tel:", "javascript:", "#")):
            return match.group(0)
        absolute_url = normalize_url(stripped, current_url)
        if should_fetch(absolute_url):
            discovered.add(absolute_url)
            raw_url = relative_target(current_url, absolute_url)
        return f"{attr}={quote}{raw_url}{quote}"

    def replace_srcset(match: re.Match[str]) -> str:
        quote = match.group("quote")
        value = match.group("value")
        return f"srcset={quote}{rewrite_srcset(value, current_url, discovered)}{quote}"

    html = HTML_URL_ATTR_RE.sub(replace_attr, html)
    html = SRCSET_RE.sub(replace_srcset, html)
    html = rewrite_text_urls(html, current_url, discovered)
    return html


def extract_internal_urls_from_html(html: str, current_url: str) -> set[str]:
    urls: set[str] = set()

    for match in HTML_URL_ATTR_RE.finditer(html):
        raw_url = match.group("url").strip()
        if raw_url.startswith(("mailto:", "tel:", "javascript:", "#")):
            continue
        absolute_url = normalize_url(raw_url, current_url)
        if should_fetch(absolute_url):
            urls.add(absolute_url)

    for match in SRCSET_RE.finditer(html):
        for entry in match.group("value").split(","):
            item = entry.strip()
            if not item:
                continue
            raw_url = item.split()[0]
            absolute_url = normalize_url(raw_url, current_url)
            if should_fetch(absolute_url):
                urls.add(absolute_url)

    for match in CSS_URL_RE.finditer(html):
        raw_url = match.group("url").strip()
        absolute_url = normalize_url(raw_url, current_url)
        if should_fetch(absolute_url):
            urls.add(absolute_url)

    for match in CSS_IMPORT_RE.finditer(html):
        raw_url = match.group("url").strip()
        absolute_url = normalize_url(raw_url, current_url)
        if should_fetch(absolute_url):
            urls.add(absolute_url)

    return urls


def extract_internal_urls_from_css(css: str, current_url: str) -> set[str]:
    urls: set[str] = set()
    for match in CSS_URL_RE.finditer(css):
        raw_url = match.group("url").strip()
        absolute_url = normalize_url(raw_url, current_url)
        if should_fetch(absolute_url):
            urls.add(absolute_url)
    for match in CSS_IMPORT_RE.finditer(css):
        raw_url = match.group("url").strip()
        absolute_url = normalize_url(raw_url, current_url)
        if should_fetch(absolute_url):
            urls.add(absolute_url)
    return urls


def extract_internal_urls_from_js(js: str, current_url: str) -> set[str]:
    urls: set[str] = set()
    for match in JS_ASSET_REF_RE.finditer(js):
        absolute_url = normalize_url(match.group("url"), current_url)
        if should_fetch(absolute_url):
            urls.add(absolute_url)
    return urls


def save_text(path: Path, text: str) -> None:
    ensure_parent(path)
    path.write_text(text, encoding="utf-8", newline="\n")


def save_bytes(path: Path, data: bytes) -> None:
    ensure_parent(path)
    path.write_bytes(data)


def crawl() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    queue: deque[str] = deque(
        [
            f"{BASE_URL}/",
            f"{BASE_URL}/models",
            f"{BASE_URL}/contact",
            f"{BASE_URL}/about",
            f"{BASE_URL}/technology",
            f"{BASE_URL}/faq",
            f"{BASE_URL}/blog",
        ]
    )
    seen: set[str] = set()
    fetched: set[str] = set()
    asset_count = 0
    page_count = 0
    errors: list[str] = []

    while queue:
        url = normalize_url(queue.popleft())
        if url in seen or not should_fetch(url):
            continue
        seen.add(url)

        try:
            data, content_type, final_url = fetch(url)
        except (HTTPError, URLError) as exc:
            errors.append(f"{url} -> {exc}")
            continue

        final_url = normalize_url(final_url)
        if final_url in fetched and url != final_url:
            continue
        fetched.add(final_url)

        output_path = local_path_for_url(final_url)

        if content_type == "text/html" or output_path.suffix.lower() in {".html", ".htm"} or not Path(urlparse(final_url).path).suffix:
            html = decode_text(data, content_type)
            discovered: set[str] = set()
            discovered.update(extract_internal_urls_from_html(html, final_url))
            rewritten = rewrite_html(html, final_url, discovered)
            save_text(output_path, rewritten)
            page_count += 1
            for discovered_url in sorted(discovered):
                if discovered_url not in seen:
                    queue.append(discovered_url)
            continue

        if content_type == "text/css" or output_path.suffix.lower() == ".css":
            css = decode_text(data, content_type)
            discovered = extract_internal_urls_from_css(css, final_url)
            rewritten = rewrite_text_urls(css, final_url, discovered)
            save_text(output_path, rewritten)
            asset_count += 1
            for discovered_url in sorted(discovered):
                if discovered_url not in seen:
                    queue.append(discovered_url)
            continue

        if content_type in {"application/javascript", "text/javascript", "application/x-javascript"} or output_path.suffix.lower() in {".js", ".mjs"}:
            js = decode_text(data, content_type)
            discovered = extract_internal_urls_from_js(js, final_url)
            rewritten = rewrite_js_assets(js, final_url, discovered)
            save_text(output_path, rewritten)
            asset_count += 1
            for discovered_url in sorted(discovered):
                if discovered_url not in seen:
                    queue.append(discovered_url)
            continue

        save_bytes(output_path, data)
        asset_count += 1

    print(f"Mirrored {page_count} pages and {asset_count} assets into {OUTPUT_ROOT}")
    if errors:
        print("Errors:")
        for item in errors:
            print(f"- {item}")


if __name__ == "__main__":
    crawl()
