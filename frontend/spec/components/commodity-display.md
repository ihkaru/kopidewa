# Component Specification: CommodityDisplay

This document specifies the `CommodityDisplay.vue` component.

## Description

This component displays a horizontally scrolling list of commodity cards. It is designed to provide a quick, at-a-glance view of the current prices of various commodities. The scrolling is continuous and loops automatically.

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | Array | Yes | An array of commodity objects to be displayed. |

**Data Array Structure:**

The `data` prop is an array of the same commodity objects described in the `MainChart.vue` specification.

## Events

This component does not emit any events.

## Slots

This component does not use any slots.

## State Management

*   **Reads from `selectionStore`**: This component reads the selected region from the `selectionStore` to display the appropriate market name (`Pasar`).
