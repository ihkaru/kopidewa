# Plan v31: Clean up MainChart.vue

## Goal

The user has confirmed the chart is rendering after replacing the file with a working version. The goal is to clean up the remaining `console.log` statements from `src/components/MainChart.vue`.

## Steps

1.  **Read `src/components/MainChart.vue`:** Get the current content of the file.
2.  **Identify `console.log` statements:** Find all instances of `console.log` within the `<script setup>` section.
3.  **Remove `console.log` statements:** Use the `replace` tool to remove the identified lines. The main one to remove is `console.log("mainchart", props.data);` inside `onMounted`. There are also some in `filteredData` for the "1W" case.
4.  **Confirm with user:** Ask the user to verify that the cleanup is correct and the chart still works.
