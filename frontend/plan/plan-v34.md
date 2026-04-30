# Plan v34: Further debug scrolling issue in ListKomoditas.vue

## Goal

The user reports that adding `.prevent` did not fix the scroll-to-top issue. I need to investigate further.

## Hypothesis

The issue is not the button's default action, but a side effect of the dialog closing or the component re-rendering.

## Steps

1.  **Isolate the cause:** I will modify the `selectPeriod` and `selectWilayah` functions. I will temporarily comment out the line `showPeriodDialog.value = false;`.
2.  **Test:** This will allow us to see if the scrolling happens when the state is updated, or when the dialog is closed.
    *   If the page still scrolls, the problem is with the state update and re-render.
    *   If the page does *not* scroll, the problem is with the dialog closing (`showPeriodDialog.value = false;`).
3.  **Formulate a fix:**
    *   If it's the re-render, we might need to look at the list component itself and how it handles data changes.
    *   If it's the dialog closing, we might need to close it in a `nextTick` or with a small `setTimeout` to allow the browser to handle the state update first.
4.  **Implement the diagnostic change:** Use `replace` to comment out the dialog closing lines.
5.  **Ask user to test and report behavior.**
