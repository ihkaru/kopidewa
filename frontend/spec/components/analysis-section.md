# Analysis Section Component Specification

## 1. Overview

The `AnalysisSection` component is responsible for displaying AI-powered analysis of commodity prices. It fetches data from an external API and presents it in a user-friendly and informative way.

## 2. Data

The component fetches an array of analysis objects from the `/api/analisis-harga` endpoint. Each object contains a detailed analysis for a specific commodity.

## 3. UI

The component consists of a series of cards, one for each commodity analysis. Each card has a tabbed interface to organize the information into the following categories:

- **Ringkasan (Summary):** Displays the key observation, short-term outlook, trend direction, and volatility level.
- **Detail Analisis (Analysis Detail):** Displays the current position, price pattern, volatility analysis, and trend analysis.
- **Rekomendasi (Recommendations):** Displays monitoring suggestions and key metrics to watch.
- **Peringatan (Warnings):** Displays data-based alerts and statistical warnings.

The component supports both a dark and a light theme, which can be controlled via a `dark` prop.

## 4. Behavior

- The component fetches data from the API when it is mounted.
- A typing effect is used to display the `key_observation` and `short_term_outlook` text.
- The user can switch between the different tabs to view the different categories of information.
