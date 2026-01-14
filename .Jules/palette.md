# Palette's Journal - Critical UX Learnings

## 2024-05-21 - Skip Link Visibility
**Learning:** Skip links are critical for keyboard users but often hidden. Using standard focus-visible styles ensures they are prominent when needed but invisible otherwise.
**Action:** Always verify skip link contrast and z-index to ensure it appears above sticky navbars.

## 2024-05-21 - Active State Indication
**Learning:** Screen readers need `aria-current="page"` to know which link represents the current page, not just visual cues.
**Action:** Always add `aria-current="page"` to the active navigation link.
