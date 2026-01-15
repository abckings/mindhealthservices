# Palette's Journal - Critical UX Learnings

## 2025-02-18 - Mobile Menu Accessibility
**Learning:** The mobile menu button was using `focus:outline-none` which completely removes the focus indicator, making it inaccessible for keyboard users.
**Action:** Always replace `focus:outline-none` with `focus-visible:outline-none` combined with `focus-visible:ring-*` styles to maintain accessibility while keeping the design clean for mouse users.

## 2025-02-18 - Skip Link Importance
**Learning:** A "Skip to main content" link is often forgotten but is essential for keyboard users to bypass repetitive navigation. It's easy to implement with a hidden-until-focused link.
**Action:** Ensure every project has a skip link as the first focusable element.

## 2024-05-21 - Skip Link Visibility
**Learning:** Skip links are critical for keyboard users but often hidden. Using standard focus-visible styles ensures they are prominent when needed but invisible otherwise.
**Action:** Always verify skip link contrast and z-index to ensure it appears above sticky navbars.

## 2024-05-21 - Active State Indication
**Learning:** Screen readers need `aria-current="page"` to know which link represents the current page, not just visual cues.
**Action:** Always add `aria-current="page"` to the active navigation link.
