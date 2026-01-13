# Palette's Journal

## 2025-02-18 - Mobile Menu Accessibility
**Learning:** The mobile menu button was using `focus:outline-none` which completely removes the focus indicator, making it inaccessible for keyboard users.
**Action:** Always replace `focus:outline-none` with `focus-visible:outline-none` combined with `focus-visible:ring-*` styles to maintain accessibility while keeping the design clean for mouse users.

## 2025-02-18 - Skip Link Importance
**Learning:** A "Skip to main content" link is often forgotten but is essential for keyboard users to bypass repetitive navigation. It's easy to implement with a hidden-until-focused link.
**Action:** Ensure every project has a skip link as the first focusable element in the body, linking to the main content area (which should have `tabIndex={-1}` for focusability).
