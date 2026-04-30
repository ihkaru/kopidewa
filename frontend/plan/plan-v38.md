# Plan v38: Fix -100% Price Change Bug

## Goal

The user reports that price changes show as -100% on days with no new data (weekends, holidays) because the current price is incorrectly treated as 0. The fix is to use the *most recent available price* instead of 0.

## Steps

1.  **Locate the faulty logic:** The price calculation logic is centralized in a utility file. Based on previous analysis of `ListKomoditas.vue`, the relevant functions are likely within `src/utils/utils.js` or `src/utils/hargaUtils.js`. I will start by reading `src/utils/utils.js` to find the `getPriceChange` function.

2.  **Analyze the `getPriceChange` function:** I will examine the function to see how it calculates the current price and the previous price. The bug is likely in how it determines the "current" price. If today's date has no entry, it probably defaults to 0 instead of finding the last valid entry.

3.  **Formulate a fix:**
    *   The `getLastPrice` function (or similar logic inside `getPriceChange`) needs to be modified.
    *   Instead of just looking for a price entry for "today", it should find the most recent price entry in the dataset. This means sorting the data by date descending and taking the first entry.
    *   The `getPriceChange` function should then use this *actual* last price to compare against the price from the selected period (1D, 1W, 1M ago).

4.  **Implement the fix:** I will apply the necessary changes to the utility file. This should fix the issue globally wherever `Utils.getPriceChange` is used.

5.  **Verify:** I will ask the user to check both `ListKomoditas` and `AnalysisSection` to confirm that the price changes are now calculated correctly on weekends and holidays.
