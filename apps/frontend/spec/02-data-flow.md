# Data Flow

The application's data flow is designed to be unidirectional and reactive, making it easy to manage and reason about the state of the application.

**1. Data Fetching:**

*   The application fetches commodity data from an API using the `SyncKomoditas.js` service. This service is responsible for making the HTTP requests to the backend and retrieving the data.

**2. State Management:**

*   The fetched data is stored in a Pinia store, specifically the `komoditasStore.js`. Pinia is a lightweight state management library for Vue.js that provides a centralized store for the application's state.
*   The `selectionStore.js` is another Pinia store that manages the user's selections, such as the selected commodity and region. This allows different components to share and react to the user's choices.

**3. Data Consumption:**

*   The Vue components in the application, such as `IndexPage.vue`, `CommodityDisplay.vue`, `MainChart.vue`, and `ListKomoditas.vue`, consume the data from the Pinia stores.
*   The components use computed properties and watchers to react to changes in the stores. When the data in the stores is updated, the components automatically re-render to reflect the new state.
