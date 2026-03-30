"""
E2E Smoke Tests — Code & Dragons
URL: https://code-and-dragons.vercel.app

Covers:
  1. Homepage loads — title, header, XP counter
  2. Lesson renders — narrative, theory, editor, run button
  3. Dungeon sidebar — visible on desktop, lessons listed
  4. Language toggle — JS/TS switch works
  5. Run test with WRONG code — shows failure feedback
  6. Run test with CORRECT code — shows success + advances lesson
  7. Mobile drawer — hamburger opens/closes sidebar
"""

import sys
import time
from playwright.sync_api import sync_playwright, expect

BASE_URL = "https://code-and-dragons.vercel.app"
PASS  = "✅"
FAIL  = "❌"
WARN  = "⚠️ "

results = []

def check(name, fn):
    try:
        fn()
        results.append((PASS, name, None))
        print(f"  {PASS} {name}")
    except Exception as e:
        results.append((FAIL, name, str(e)))
        print(f"  {FAIL} {name}")
        print(f"       {str(e)[:120]}")

print()
print("🧪 E2E Smoke Tests — code-and-dragons.vercel.app")
print("━" * 56)

with sync_playwright() as p:
    # ── Desktop ──────────────────────────────────────────────
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    page.goto(BASE_URL, wait_until="networkidle")

    def t1_title():
        assert "code-and-dragons" in page.title().lower(), f"title: {page.title()}"

    def t2_header():
        h1 = page.locator("h1").first
        assert h1.is_visible()
        assert "Code" in h1.inner_text()

    def t3_xp_counter():
        xp = page.get_by_text("XP").first
        assert xp.is_visible(), "XP counter not found"

    def t4_lesson_narrative():
        narrative = page.locator('[aria-label="Narrativa"]').first
        assert narrative.is_visible()
        assert len(narrative.inner_text().strip()) > 20

    def t5_lesson_theory():
        theory = page.locator('[aria-label="Teoria"]').first
        assert theory.is_visible()
        assert len(theory.inner_text().strip()) > 20

    def t6_monaco_editor():
        # Monaco renders an iframe or a div.monaco-editor
        page.wait_for_selector(".monaco-editor", timeout=10000)
        editor = page.locator(".monaco-editor").first
        assert editor.is_visible()

    def t7_run_button():
        btn = page.get_by_text("Verificar Magia")
        assert btn.is_visible()

    def t8_sidebar_desktop():
        sidebar = page.locator('aside[aria-label="Mapa do dungeon"]')
        assert sidebar.is_visible()
        # At least one lesson item in sidebar
        items = page.locator('aside[aria-label="Mapa do dungeon"] button')
        assert items.count() >= 1

    def t9_lang_toggle():
        ts_btn = page.locator('button[aria-pressed]', has_text="TS").first
        assert ts_btn.is_visible()
        ts_btn.click()
        time.sleep(0.5)
        # TS hint text appears
        hint = page.get_by_text("tipos são removidos antes dos testes")
        assert hint.is_visible()
        # Switch back to JS
        js_btn = page.locator('button[aria-pressed]', has_text="JS").first
        js_btn.click()
        time.sleep(0.3)

    def _set_editor_value(val):
        """Set Monaco editor value via JS API — bypasses keyboard interaction."""
        page.wait_for_selector(".monaco-editor", timeout=10000)
        time.sleep(0.8)
        page.evaluate("""(code) => {
            const editors = window.monaco?.editor?.getEditors?.()
            if (editors && editors.length > 0) {
                editors[0].setValue(code)
            }
        }""", val)
        time.sleep(0.3)

    def t10_run_wrong_code():
        page.goto(BASE_URL, wait_until="networkidle")
        _set_editor_value("const x = 1;")  # doesn't export anything expected
        btn = page.get_by_text("Verificar Magia")
        btn.click()
        page.wait_for_selector('[aria-label="Resultados dos testes"]', timeout=8000)
        red_items = page.locator('[aria-label="Resultados dos testes"] li.bg-red-900')
        assert red_items.count() >= 1, "Expected at least 1 failed test"

    def t11_run_correct_srp():
        correct_js = """class Blacksmith {
  forge() { return 'forging'; }
}
class Temperer {
  temper() { return 'tempering'; }
}
class Merchant {
  sell() { return 'selling'; }
}
export { Blacksmith, Temperer, Merchant }"""
        _set_editor_value(correct_js)
        btn = page.get_by_text("Verificar Magia")
        btn.click()
        try:
            page.wait_for_selector('[role="status"]', timeout=8000)
            text = page.locator('[role="status"]').inner_text()
            assert "passaram" in text.lower() or "avançando" in text.lower(), f"unexpected: {text}"
        except Exception:
            green = page.locator('[aria-label="Resultados dos testes"] li.bg-green-900').count()
            total = page.locator('[aria-label="Resultados dos testes"] li').count()
            assert green == total and total > 0, f"Expected all green: {green}/{total}"

    # ── Mobile ────────────────────────────────────────────────
    mobile_page = browser.new_page(viewport={"width": 390, "height": 844})
    mobile_page.goto(BASE_URL, wait_until="networkidle")

    def t12_mobile_drawer():
        # Sidebar hidden on mobile
        sidebar = mobile_page.locator('aside[aria-label="Mapa do dungeon"]')
        assert not sidebar.is_visible(), "sidebar should be hidden on mobile"
        # Hamburger / MobileNav button
        hamburger = mobile_page.locator('button[aria-label]').first
        hamburger.click()
        time.sleep(0.4)
        # Drawer content visible
        drawer = mobile_page.locator('[role="dialog"]')
        assert drawer.is_visible(), "mobile drawer not opened"
        # Close it
        mobile_page.keyboard.press("Escape")
        time.sleep(0.3)

    print()
    print("── Desktop ─────────────────────────────────────────")
    check("Title contains 'code-and-dragons'", t1_title)
    check("Header ⚔️ Code & Dragons visible", t2_header)
    check("XP counter present", t3_xp_counter)
    check("Lesson narrative section renders", t4_lesson_narrative)
    check("Lesson theory section renders", t5_lesson_theory)
    check("Monaco editor loads", t6_monaco_editor)
    check("'Verificar Magia' button present", t7_run_button)
    check("Dungeon sidebar visible on desktop", t8_sidebar_desktop)
    check("Language toggle JS ↔ TS works", t9_lang_toggle)
    check("Wrong code → failure feedback", t10_run_wrong_code)
    check("Correct SRP code → success modal", t11_run_correct_srp)
    print()
    print("── Mobile (390px) ──────────────────────────────────")
    check("Mobile drawer opens/closes", t12_mobile_drawer)

    browser.close()

print()
print("━" * 56)
passed = sum(1 for r in results if r[0] == PASS)
failed = sum(1 for r in results if r[0] == FAIL)
total  = len(results)
status = "✅ ALL PASSED" if failed == 0 else f"❌ {failed} FAILED"
print(f"{status} | {passed}/{total} checks")
print()
sys.exit(0 if failed == 0 else 1)
