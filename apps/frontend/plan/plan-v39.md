# Plan v39: Redesign AnalysisSection.vue UI

## Goal

The user wants to redesign the `AnalysisSection.vue` component to display a new, complex JSON structure in a professional and organized manner.

## UI/UX Strategy

The data is dense and text-heavy. A simple layout will be overwhelming. I will use a tabbed interface (`q-tabs`) to group related information, allowing users to get a high-level summary and then dive into specific details.

The UI will be structured as follows:
1.  **Header:** Display the commodity name, a prominent badge for the `condition_level`, and the `key_observation` summary.
2.  **Key Metrics:** A row of small cards for important metrics like Volatility, Trend, and Deviation.
3.  **Tabs:** A `q-tabs` component with the following panels:
    *   **Analisis Rinci (Detailed Analysis):** Contains the core analysis paragraphs.
    *   **Proyeksi & Implikasi (Outlook & Implications):** Contains forward-looking statements.
    *   **Analisis Strategis (Strategic Analysis):** Contains the deeper "why" and "what if".
    *   **Rekomendasi (Recommendations):** Contains actionable lists like alerts and monitoring suggestions.
    *   **Untuk Stakeholder (For Stakeholders):** Presents the targeted questions for different departments.
    *   **Metodologi (Methodology):** Contains the fine print about data quality, constraints, and assumptions.

## Implementation Steps

1.  **Read `AnalysisSection.vue`:** Get the current content of the component to understand its existing structure and props.
2.  **Update the Store:** The data is fetched in `analysisStore.js`. I will need to read and potentially update this store to handle the new JSON structure if it's not already doing so.
3.  **Re-write `AnalysisSection.vue`:**
    *   Replace the entire `<template>` with the new structure using Quasar components (`q-card`, `q-tabs`, `q-tab`, `q-tab-panels`, `q-tab-panel`, `q-chip`, `q-list`, `q-item`).
    *   Update the `<script setup>` to handle the new data structure. The component will likely receive the analysis data as a prop or get it from the `analysisStore`. It will need computed properties or refs to manage the selected tab.
    *   Add appropriate styling to make the UI look clean, professional, and easy to read. This includes using icons, spacing, and typography effectively.
4.  **Confirm with user:** Ask the user to verify the new UI.
