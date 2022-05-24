---
"@radiantguild/form-contexts": minor
---

Added the `useInitialValidationUpdate` hook, which can be used to have some validation state that will clear when a new one is set. You could do this by having two places call `useValidation`, however this can have weird issues sometimes and it can be changed back too early too.
