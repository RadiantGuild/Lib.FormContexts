---
"@radiantguild/form-contexts": minor
---

Added the `useInitialValidationUpdate` hook, which can be used to have some validation state that will clear when a new one is set.

The hook was created for the use-case where you have "instant" validation that can respond as a user types in a value, as well as delayed validation that you can only get e.g. when you submit the form.

You can still use the normal `useValidationUpdate` hook for instant validation results, but now instead of using that hook for delayed validation, you call `useInitialValidationUpdate`.

When using synchronous validation, this hook will act the same as `useValidationUpdate` (although it acts as a fallback when the standard funtion is called with `null`).

If you use asynchronous validation, the hook becomes a bit more fancy, as it can keep showing the initial validation result until the standard one has finished loading. Specifically, it will show until the next loading state finishes.

Here's a minimal example to give you an idea of how it might be used:

```jsx
// serverSideError is set whenever the user clicks a submit button
useInitialValidationUpdate(props.serverSideError);

// value is the current value of the input, set in an onChange handler
const validateResult = useValidation(props.value, props.validators);
useValidationUpdate(validateResult);
```
