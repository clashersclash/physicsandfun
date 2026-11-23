"""
Weekly SEO & AEO (Answer Engine Optimization) Autonomous Ranking Booster
Target: https://physicsandfun.run.place (and https://www.physicsandfun.run.place)
Owner: Physics & Fun (Gyanankur Sarma)

Key Execution Pillars:
1. Freshness Pulse: Updates <lastmod> in sitemap.xml and pushes to GitHub Pages to trigger a fresh build.
2. IndexNow Protocol: Submits live URLs to IndexNow (Bing, Yandex, Seznam, Naver) for instant crawl indexing.
3. Multi-Bot Verification: Tests access for Googlebot, PerplexityBot, GPTBot, ClaudeBot, and Applebot.
4. AI Answer Engine (AEO) Cache Warming: Validates and pre-warms llms.txt & llms-full.txt endpoints.
5. Persistent Health Telemetry: Records audit metrics in seo_aeo_history.log.
"""

import os
import sys
import re
import json
import subprocess
import datetime
import urllib.request
import urllib.error

INDEXNOW_KEY = "f9d7c3b2e1a8456087b321c890defabc"
HOST_DOMAIN = "physicsandfun.run.place"
CANONICAL_DOMAIN = "https://www.physicsandfun.run.place"
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "seo_aeo_history.log")

AI_BOTS = {
    "Googlebot": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "PerplexityBot": "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://docs.perplexity.ai/docs/perplexitybot)",
    "GPTBot": "Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)",
    "ClaudeBot": "Mozilla/5.0 (compatible; ClaudeBot/1.0; +https://www.anthropic.com/claudebot)",
    "Applebot": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)"
}

TARGET_URLS = [
    f"{CANONICAL_DOMAIN}/",
    f"{CANONICAL_DOMAIN}/#courses",
    f"{CANONICAL_DOMAIN}/#mentor",
    f"{CANONICAL_DOMAIN}/#results",
    f"{CANONICAL_DOMAIN}/#faq",
    f"{CANONICAL_DOMAIN}/#contact"
]

def log(msg):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    formatted = f"[{timestamp}] {msg}"
    print(formatted)
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(formatted + "\n")
    except Exception as e:
        print(f"Failed writing to log: {e}")

def update_sitemap_freshness():
    """Updates <lastmod> timestamps in sitemap.xml to trigger freshness signal."""
    sitemap_path = os.path.join(ROOT_DIR, "sitemap.xml")
    if not os.path.exists(sitemap_path):
        log(f"[!] sitemap.xml not found at: {sitemap_path}")
        return False

    today_str = datetime.date.today().strftime("%Y-%m-%d")
    with open(sitemap_path, "r", encoding="utf-8") as f:
        content = f.read()

    new_content, count = re.subn(r"<lastmod>[^<]+</lastmod>", f"<lastmod>{today_str}</lastmod>", content)
    if count > 0 and new_content != content:
        with open(sitemap_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        log(f"[✓] Sitemap freshness updated with date: {today_str} ({count} URLs updated)")
        return True
    else:
        log(f"[-] Sitemap already contains today's date ({today_str})")
        return False

def push_github_freshness():
    """Commits and pushes updated sitemap to GitHub Pages to trigger a rebuild."""
    try:
        status_proc = subprocess.run(
            ["git", "-C", ROOT_DIR, "status", "--porcelain"],
            capture_output=True, text=True, check=True
        )
        if not status_proc.stdout.strip():
            log("[-] No repository changes to commit.")
            return True

        subprocess.run(["git", "-C", ROOT_DIR, "add", "."], check=True, capture_output=True)
        commit_msg = f"chore(seo): weekly crawl freshness pulse [{datetime.date.today().strftime('%Y-%m-%d')}]"
        subprocess.run(["git", "-C", ROOT_DIR, "commit", "-m", commit_msg], check=True, capture_output=True)
        log(f"[✓] Created freshness commit: '{commit_msg}'")

        push_proc = subprocess.run(
            ["git", "-C", ROOT_DIR, "push", "origin", "main"],
            capture_output=True, text=True, check=True
        )
        log(f"[✓] Pushed to GitHub Pages: Auto-deploy triggered for {HOST_DOMAIN}")
        return True
    except subprocess.CalledProcessError as e:
        log(f"[!] Git operation error: {e.stderr or e}")
        return False
    except Exception as e:
        log(f"[!] Unexpected git error: {e}")
        return False

def ping_indexnow():
    """Submits URLs via the official IndexNow API for instant Bing / Yandex crawling."""
    api_url = "https://api.indexnow.org/indexnow"
    payload = {
        "host": HOST_DOMAIN,
        "key": INDEXNOW_KEY,
        "keyLocation": f"{CANONICAL_DOMAIN}/{INDEXNOW_KEY}.txt",
        "urlList": TARGET_URLS
    }

    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            api_url,
            data=data,
            headers={"Content-Type": "application/json; charset=utf-8"},
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            log(f"[✓] IndexNow Submission Status: HTTP {resp.status} (Pinged Bing, Yandex, Seznam)")
            return True
    except urllib.error.HTTPError as e:
        log(f"[!] IndexNow HTTP Error: {e.code} - {e.read().decode('utf-8', errors='ignore')}")
        return False
    except Exception as e:
        log(f"[!] IndexNow Request Failed: {e}")
        return False

def ping_search_engines():
    """Submits sitemap ping notifications to standard web crawlers."""
    sitemap_url = f"{CANONICAL_DOMAIN}/sitemap.xml"
    endpoints = [
        f"https://www.google.com/ping?sitemap={sitemap_url}",
        f"https://www.bing.com/ping?sitemap={sitemap_url}"
    ]
    for url in endpoints:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (PhysicsAndFun-SeoBot/1.0)"})
            with urllib.request.urlopen(req, timeout=8) as resp:
                log(f"[✓] Pinged {url.split('//')[1].split('/')[0]}: HTTP {resp.status}")
        except Exception as e:
            log(f"[-] Ping {url.split('//')[1].split('/')[0]} status: {e}")

def verify_ai_bots_and_aeo():
    """Verifies that all major AI search bots can access llms.txt and the homepage."""
    log("--> Auditing AI Answer Engine (AEO) bot access & cache warming:")
    urls_to_test = [
        f"{CANONICAL_DOMAIN}/",
        f"{CANONICAL_DOMAIN}/llms.txt",
        f"{CANONICAL_DOMAIN}/robots.txt"
    ]

    for bot_name, ua in AI_BOTS.items():
        for u in urls_to_test:
            try:
                req = urllib.request.Request(u, headers={"User-Agent": ua})
                with urllib.request.urlopen(req, timeout=10) as resp:
                    status = resp.status
                    length = len(resp.read())
                    log(f"    [{bot_name}] -> {u.split('/')[-1] or 'root'}: HTTP {status} ({length} bytes)")
            except Exception as e:
                log(f"    [!] [{bot_name}] -> {u}: {e}")

def main():
    log("================================================================================")
    log("STARTING WEEKLY SEO & AEO AUTONOMOUS CRAWL RANK BOOSTER")
    log("================================================================================")

    # Step 1: Update sitemap freshness date
    sitemap_changed = update_sitemap_freshness()

    # Step 2: Push updates to GitHub if modified
    push_github_freshness()

    # Step 3: Trigger IndexNow Instant Crawl
    ping_indexnow()

    # Step 4: Search Engine Sitemaps Ping
    ping_search_engines()

    # Step 5: AEO Multi-Bot Access & Knowledge Base Verification
    verify_ai_bots_and_aeo()

    log("================================================================================")
    log("[✓] WEEKLY SEO & AEO BOOSTER CYCLE COMPLETED SUCCESSFULLY")
    log("================================================================================")

if __name__ == "__main__":
    main()
