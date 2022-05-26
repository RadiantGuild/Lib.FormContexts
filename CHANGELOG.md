# @radiantguild/form-contexts

## 0.2.0-beta.1

### Patch Changes

-   [`9f5be6a`](https://github.com/RadiantGuild/Lib.FormContexts/commit/9f5be6a8bdc226da80cf56b9a43cb1940264f773) Thanks [@Alduino](https://github.com/Alduino)! - `useValidationUpdate` is now ignored if `useInitialValidationUpdate` was just called, so that order doesn't matter.

## 0.2.0-beta.0

### Minor Changes

-   [#4](https://github.com/RadiantGuild/Lib.FormContexts/pull/4) [`56dbc26`](https://github.com/RadiantGuild/Lib.FormContexts/commit/56dbc264026a7ff6b1dd4ead4988ab16f5b27395) Thanks [@Alduino](https://github.com/Alduino)! - Added the `useInitialValidationUpdate` hook, which can be used to have some validation state that will clear when a new one is set.

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

## 0.1.3

### Patch Changes

-   [`aa4b304`](https://github.com/RadiantGuild/Lib.FormContexts/commit/aa4b304e43225057a7722d354adae1d0405427d9) Thanks [@Alduino](https://github.com/Alduino)! - Split up the validation context to prevent infinite render loops

## 0.1.2

### Patch Changes

-   [`5d08fa4`](https://github.com/RadiantGuild/Lib.FormContexts/commit/5d08fa46aaeb0c37c8321f5ba525aa421f5acc03) Thanks [@Alduino](https://github.com/Alduino)! - Remove suspense from `useInputState`

## 0.1.1

### Patch Changes

-   [`bfb4c50`](https://github.com/RadiantGuild/Lib.FormContexts/commit/bfb4c50b319b5ae206a3205dfbc2ca3fe0dcca32) Thanks [@Alduino](https://github.com/Alduino)! - Add missing Suspense-using validation that I forgot to implement
