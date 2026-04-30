# User Interaction (BDD)

This document describes the user interactions with the application in a Behavior-Driven Development (BDD) format.

## Scenario 1: Viewing Commodity Prices

**Given** the user is on the main page

**When** the page loads

**Then** the user should see a hero section with the application title

**And** the user should see a horizontally scrolling display of commodity cards

**And** each commodity card should show the commodity's name, icon, and current price

## Scenario 2: Viewing AI Analysis

**Given** the user is on the main page

**When** the page loads

**Then** the user should see an AI Analysis section

**And** the user should see a card for each commodity analysis

**And** each card should have a tabbed interface with the following tabs: "Ringkasan", "Detail Analisis", "Rekomendasi", and "Peringatan"

**When** the user clicks on a tab

**Then** the content of the tab should be displayed

## Scenario 3: Viewing Detailed Commodity Information

**Given** the user is on the main page

**When** the user scrolls down to the list of commodities

**And** the user clicks on a commodity in the list

**Then** the main chart should update to display the price history for the selected commodity

**And** the main chart should show the commodity's name, current price, and price change

## Scenario 4: Changing the Time Period

**Given** the user is viewing the detailed chart for a commodity

**When** the user clicks on a time period button (e.g., "1W", "1M", "1Y")

**Then** the main chart should update to show the price history for the selected time period

**And** the list of commodities should update to show the price change for the selected time period

## Scenario 5: Changing the Region

**Given** the user is on the main page

**When** the user opens the region selection dialog

**And** the user selects a new region

**Then** the main chart should update to show the price history for the selected region

**And** the list of commodities should update to show the prices for the selected region

**And** the commodity display should show the market name for the selected region