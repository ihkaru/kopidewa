# Plan v35: Fix Dialog Scrolling Issue in ListKomoditas.vue

## Goal

The user has confirmed that the scrolling issue is caused by the dialog closing. The goal is to fix this by delaying the dialog closure until after the next DOM update cycle.

## Steps

1.  **Import `nextTick`:** Add `nextTick` to the `import` statement from `vue` in `src/components/ListKomoditas.vue`.
2.  **Modify `selectPeriod`:**
    *   Un-comment the `showPeriodDialog.value = false;` line.
    *   Wrap this line in a `nextTick` callback.
3.  **Implement the fix:** Apply these changes using the `replace` tool.
4.  **Confirm with user:** Ask the user to verify that the fix works and the dialog now closes without causing the page to scroll.
