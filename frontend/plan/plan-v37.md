# Plan v37: Re-investigate scrolling issue in ListKomoditas.vue

## Goal

The user reports that the scroll-to-top issue is still happening after the `nextTick` fix was applied. I need to investigate why the fix is not working.

## Steps

1.  **Verify the Code:** Read the current content of `src/components/ListKomoditas.vue` to confirm that my previous fixes are still in place:
    *   The `@click.prevent` modifier on the period and region buttons.
    *   The `nextTick` wrapper around `showPeriodDialog.value = false;` in the `selectPeriod` function.
2.  **Analyze the Verified Code:**
    *   If the fixes are missing, I will re-apply them.
    *   If the fixes are present, then the issue is more complex. The interaction between the Pinia store update, the component re-render, and the Quasar dialog closing is causing a focus shift that `nextTick` is not solving.
3.  **Formulate a New Fix (if necessary):**
    *   If the existing fix is in place but not working, a more forceful approach is needed. Instead of just closing the dialog, we can try to explicitly set the focus back to an element on the list before closing.
    *   A simpler, alternative approach is to use a small `setTimeout` instead of `nextTick`. While `nextTick` is technically more correct for Vue, a `setTimeout` of a few milliseconds can sometimes solve tricky browser focus/rendering issues more reliably by breaking the execution context completely.
4.  **Implement the Fix:** Apply the new fix.
5.  **Confirm with user.**
