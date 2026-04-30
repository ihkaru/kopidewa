# Component Specification: MainChart

This document specifies the `MainChart.vue` component.

## Description

This component displays a line chart of a commodity's price history. It also shows the current price, price change, and allows the user to select different time periods to view the data.

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | Object | Yes | An object containing the commodity data to be displayed. |

**Data Object Structure:**

```json
{
  "nama": "Beras Cap Burung Hong (Medium)",
  "symbol": "BCHM",
  "icon": "fas fa-seedling",
  "currentPrice": 17100,
  "data": [
    {
      "date": "2024-10-01",
      "price": 17000,
      "kecamatan": "Mempawah Hilir"
    },
    {
      "date": "2024-10-02",
      "price": 17100,
      "kecamatan": "Mempawah Hilir"
    }
  ],
  "sparklineData": {
    "1W": [17000, 17100],
    "1M": [16000, 16500, 17000, 17100],
    "3M": [],
    "YTD": [],
    "1Y": [],
    "ALL": []
  }
}
```

## Events

This component does not emit any events.

## Slots

This component does not use any slots.

## State Management

*   **Reads from `selectionStore`**: This component reads the selected time period and region from the `selectionStore`.
*   **Writes to `selectionStore`**: When the user selects a time period, this component calls the `setSelection` action on the `selectionStore` to update the selected period.
