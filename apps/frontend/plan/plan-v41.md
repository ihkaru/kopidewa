# Plan v41: Improve Mobile Responsiveness of AnalysisSection

## Goal

The user reports that the font sizes in the redesigned `AnalysisSection.vue` are too large on mobile devices. I need to add responsive CSS to make the text more readable on smaller screens.

## Analysis

I will need to identify the specific text elements that are too large and apply smaller font sizes to them within a media query targeting mobile screen widths.

Key elements to check:
-   Main header (`text-h4`)
-   Card header (`text-h6`)
-   Metric card values (`text-h5`, `text-h6`)
-   Tab panel content (`text-body1`, `text-body2`, `q-item-label`)

## Implementation Steps

1.  **Read `AnalysisSection.vue`:** Get the current content of the file to identify the CSS classes associated with the text elements.
2.  **Add Media Queries:** I will add a `@media (max-width: 600px)` block to the `<style scoped>` section. This is a standard breakpoint for mobile devices.
3.  **Adjust Font Sizes:** Inside the media query, I will create rules to reduce the font size for the problematic elements. I will use `!important` if necessary to override Quasar's default styles, but I will try to avoid it.
    *   `.text-h4` -> `font-size: 1.5rem`
    *   `.text-h6` -> `font-size: 1.1rem`
    *   `.text-body1` -> `font-size: 0.9rem`
    *   I will also adjust padding and margins to give the content more space on small screens.
4.  **Implement the fix:** I will use the `replace` tool to add the new CSS block at the end of the `<style>` section.
5.  **Confirm with user:** Ask the user to check the component on a mobile view to verify the fix.
