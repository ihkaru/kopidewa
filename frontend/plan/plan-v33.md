# Plan v33: Debug scrolling issue in ListKomoditas.vue

## Goal

The user reports that clicking a period button in the `ListKomoditas` component causes the page to scroll to the top. I need to investigate and fix this behavior.

## Steps

1.  **Analyze `ListKomoditas.vue`:** Read the content of `src/components/ListKomoditas.vue` to understand its template and script. I will look for the period selection buttons and the event handlers associated with them.
2.  **Identify the cause:** I will look for potential causes of the scroll-to-top behavior.
    *   Check if the buttons are `<a>` tags with `href="#"`.
    *   Check if the click handler is programmatically causing a scroll.
    *   Check for any event modifiers (like `.prevent`) that might be missing.
3.  **Formulate a fix:** Based on the cause, I will formulate a fix.
    *   If it's an `<a>` tag, I will add `.prevent` to the `@click` handler (e.g., `@click.prevent="selectPeriod(...)"`) to stop the default navigation behavior.
    *   If it's a `<q-btn>`, I will check its props. Quasar buttons don't typically cause this unless they have a `to` prop set to something that resolves to the top of the page.
4.  **Implement the fix:** Apply the fix using the `replace` tool.
5.  **Confirm with user:** Ask the user to verify that the scrolling issue is resolved.
