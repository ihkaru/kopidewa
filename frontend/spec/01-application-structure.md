# Application Structure

The application is structured as a single-page application (SPA) with a clear separation of concerns. The main components and their roles are as follows:

**1. Main Components:**

*   **`IndexPage.vue`**: The main page of the application. It serves as the central hub for displaying all the key information and components.
*   **`MainLayout.vue`**: The main layout of the application. It provides the overall structure, including the header, footer, and a `router-view` to display the pages.
*   **`CommodityDisplay.vue`**: This component displays a horizontal scrollable list of commodities with their current prices. It provides a quick overview of the market.
*   **`MainChart.vue`**: This component displays a detailed chart with historical price data for a selected commodity. It allows users to analyze price trends over time.
*   **`ListKomoditas.vue`**: This component displays a list of all available commodities, allowing the user to select a commodity to view in the `MainChart`.
*   **`FooterHome.vue`**: The footer of the application, which may contain additional links and information.

**2. Routing:**

The application uses a simple routing setup with the following routes:

*   `/`: The main route that displays the `IndexPage.vue`.
*   `/:catchAll(.*)*`: A catch-all route that displays the `ErrorNotFound.vue` page for any invalid URLs.
