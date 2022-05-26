---
"@radiantguild/form-contexts": patch
---

`useValidationUpdate` is now ignored if `useInitialValidationUpdate` was just called, so that order doesn't matter.
