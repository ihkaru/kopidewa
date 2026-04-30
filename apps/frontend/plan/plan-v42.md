# Plan v42: Implement Fluid Typography with clamp()

## Goal

The user wants to improve mobile responsiveness further by using the `clamp()` CSS function for fluid font sizes. They also noted that `q-chip` and other elements are still too large.

## Analysis

I will replace the static `font-size` declarations (both the default ones and the ones in the media query) with `clamp()` for a smoother, more scalable typography. This will affect headers, body text, and chips.

## Implementation Steps

1.  **Identify Target Elements:** I will go through the `AnalysisSection.vue` template and identify all elements that need fluid typography.
    *   `.ai-header .text-h4`
    *   `.analysis-header .text-h5`
    *   `.metrics-bar .text-h6`
    *   `.insight-card .text-body1`, `.insight-card .text-body2`
    *   `q-item-label`
    *   `q-chip`

2.  **Determine `clamp()` Values:** For each element, I will define a `clamp()` function with appropriate min, preferred (viewport-based), and max values.
    *   Example for a large header: `font-size: clamp(1.5rem, 4vw, 2.25rem);`
    *   Example for a chip: `font-size: clamp(0.7rem, 1.5vw, 0.875rem);`

3.  **Refactor the CSS:**
    *   Read `AnalysisSection.vue`.
    *   Remove the previous media query I added.
    *   Update the base styles for the target elements to use the new `clamp()` function for `font-size`. I will need to create specific CSS rules for Quasar's typography classes (like `.text-h4`) within the scope of this component.
    *   I will also apply size adjustments to `q-chip` elements, possibly using `clamp()` on their padding or just setting a smaller static size.

4.  **Implement the fix:** I will use the `replace` tool to update the `<style>` section with the new fluid typography rules.

5.  **Confirm with user:** Ask the user to verify the changes on different screen sizes.
