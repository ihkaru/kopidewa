# Plan v36: Control FAB Visibility on Scroll

## Goal

The user wants the Floating Action Button (FAB) in `ListKomoditas.vue` to be hidden by default and only appear when the user scrolls down past the hero section.

## Steps

1.  **Identify the Target Element:** The user mentioned scrolling "down to main chart". The `MainChart` component is in `IndexPage.vue`, not `ListKomoditas.vue`. The FAB is in `ListKomoditas.vue`. This means I need to handle the scroll event on the main window and determine the position of an element on the `IndexPage`. A good target element would be the `div` that contains both the `MainChart` and the `ListKomoditas` component. Looking at `IndexPage.vue`, the `div` with `id="komoditas"` is a good candidate.

2.  **State Management for Visibility:**
    *   Create a new `ref` in `ListKomoditas.vue` to control the FAB's visibility, e.g., `showFab = ref(false)`.
    *   Use this `ref` with a `v-if` or `v-show` on the `<q-page-sticky>` container for the FAB. A transition would be nice, so `v-show` with a `<transition>` tag is a good choice.

3.  **Scroll Event Listener:**
    *   In the `onMounted` hook of `ListKomoditas.vue`, add a scroll event listener to the `window`.
    *   In the `onUnmounted` (or `onBeforeUnmount`) hook, remove the event listener to prevent memory leaks.

4.  **Implement Scroll Logic:**
    *   The scroll handler function will calculate the visibility.
    *   It needs to get the top position of the target element (`#komoditas` on the parent page). `document.getElementById('komoditas').offsetTop` can do this.
    *   It will compare the window's scroll position (`window.scrollY`) with the target element's top position.
    *   If `window.scrollY` is greater than the target's `offsetTop` (plus a small buffer, e.g., 100px), set `showFab.value = true`. Otherwise, set it to `false`.

5.  **Implement the Changes:**
    *   First, I will read `IndexPage.vue` to confirm the structure and the `id="komoditas"` element.
    *   Then, I will modify `ListKomoditas.vue` to add the new `ref`, the scroll listener, the logic, and the `v-show` on the FAB's container.

6.  **Confirm with user.**
