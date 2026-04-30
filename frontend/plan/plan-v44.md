# Plan v44: Create InfoTooltip Component

## Goal

I have rewritten `AnalysisSection.vue` to use a new component, `<InfoTooltip>`, but I have not created this component yet. This will cause a crash. I need to create `src/components/InfoTooltip.vue`.

## Steps

1.  **Create the file:** Use `write_file` to create `src/components/InfoTooltip.vue`.
2.  **Add the component code:** The code will consist of a simple template with a `q-icon` and a `q-tooltip`, and a script that defines a `text` prop.
3.  **Confirm with user:** Inform the user that I have created the missing child component and that the `AnalysisSection` should now render correctly.
