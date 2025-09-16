import re
from playwright.sync_api import Page, expect

def test_e2e_flow(page: Page):
    # Navigate to the homepage
    page.goto("http://localhost:5173/")

    # Click on the first product
    page.locator(".group").first.click()

    # Add the product to the cart
    page.locator("button:has-text('Add to Cart')").click()

    # Go to the cart page
    page.goto("http://localhost:5173/cart")

    # Proceed to checkout
    page.locator("a:has-text('Proceed to Checkout')").click()

    # Take a screenshot of the checkout page
    page.screenshot(path="jules-scratch/verification/checkout_page.png")

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    test_e2e_flow(page)
    browser.close()
