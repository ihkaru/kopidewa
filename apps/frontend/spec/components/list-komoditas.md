# Component Specification: ListKomoditas

This document specifies the `ListKomoditas.vue` component.

## Description

This component displays a list of commodities. Each item in the list shows the commodity's name, an icon, a sparkline chart of its recent price history, its current price, and its price change. Users can select a commodity from this list to view more details.

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | Array | Yes | An array of commodity objects to be displayed in the list. |

**Data Array Structure:**

The `data` prop is an array of the same commodity objects described in the `MainChart.vue` specification.

## Events

This component does not emit any events.

## Slots

This component does not use any slots.

## State Management

*   **Reads from `selectionStore`**: This component reads the selected time period and region from the `selectionStore` to display the correct sparkline and price change information.
*   **Writes to `selectionStore`**: When a user clicks on a commodity, this component calls the `setSelection` action on the `selectionStore` to update the selected commodity. It also provides buttons to change the selected time period and region, which also call the `setSelection` action.
