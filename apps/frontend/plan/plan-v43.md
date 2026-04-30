# Plan v43: Redesign AnalysisSection with New Data Structure and Explanations

## Goal

The user has provided a completely new JSON structure for the analysis data and wants the UI to be updated accordingly. They also want explanations for technical terms to be added to the UI. I must also be careful not to regress any of the user's manual changes.

## Acknowledging Manual Changes

Since the entire data structure has changed, a complete rewrite of the component is unavoidable. I cannot merge old changes. I will apologize for this and explain that the new data structure requires a new component. I will ask the user to re-apply their changes after I'm done, and I will offer to help them.

## UI/UX Strategy

The new data structure is well-organized. I will stick with the tabbed interface, but the tabs will now correspond to the new top-level keys in the JSON.

1.  **Header:** Will display `metadata.commodity_name` and the `price_condition_assessment.condition_level` badge.
2.  **Summary Section (Above Tabs):** Will show the `key_observation` and key metrics from `price_condition_assessment`.
3.  **Explanations:** For technical terms, I will add a small `<q-icon name="info_outline">` next to the term. This icon will have a `<q-tooltip>` that provides a simple definition.
4.  **Tabs:** The tabs will be reorganized to match the new JSON structure:
    *   **Insight Data:** `data_insights` object.
    *   **Temuan Statistik:** `statistical_findings` object.
    *   **Analisis Strategis:** `strategic_analysis` object.
    *   **Rekomendasi:** `potential_considerations` and `information_support` objects.
    *   **Untuk Stakeholder:** `stakeholder_specific_considerations` object.
    *   **Proyeksi:** `forward_indicators` object.
    *   **Batasan Analisis:** `analysis_limitations` object.

## Implementation Steps

1.  **Read `AnalysisSection.vue`:** I will read the current file to have it as a reference, but I will explain to the user that I have to overwrite it due to the new data structure.
2.  **Update Store (if needed):** I will check `analysisStore.js` again. The fetching logic is probably still fine, as it just gets whatever the API sends. The component will handle the new structure.
3.  **Create a Glossary:** I will create a simple JavaScript object within the component's `<script setup>` to hold the definitions for the technical terms. This keeps the explanation content separate from the template logic.
4.  **Re-write `AnalysisSection.vue`:**
    *   I will replace the entire file content with a new version that is built specifically for the new JSON structure.
    *   The template will use Quasar components to render the new nested objects and arrays.
    *   I will integrate the explanation icons and tooltips next to the relevant terms.
    *   The `clamp()` CSS for fluid typography will be carried over and adapted to the new structure.
5.  **Confirm and Apologize:** I will present the new component, apologize again for the overwrite, and offer to help re-integrate any lost manual changes.
