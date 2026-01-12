# Palette's Journal

## 2025-02-18 - Mobile Menu Accessibility
**Learning:** The mobile menu button was using `focus:outline-none` which completely removes the focus indicator, making it inaccessible for keyboard users.
**Action:** Always replace `focus:outline-none` with `focus-visible:outline-none` combined with `focus-visible:ring-*` styles to maintain accessibility while keeping the design clean for mouse users.
