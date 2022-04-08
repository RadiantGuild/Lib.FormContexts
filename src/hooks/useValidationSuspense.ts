import {CompleteValidateResult, ValidateResult} from "@radiantguild/yoogi";
import {ValidateHookResult} from "@radiantguild/yoogi/hook";
import useValidation from "~/hooks/useValidation";

function isFromHook(validation: ValidateResult): validation is ValidateHookResult {
    return "read" in validation;
}

/**
 * A version of `useValidation` that suspends while the validation is loading
 *
 * @see useValidation
 */
export default function useValidationSuspense(): CompleteValidateResult | null {
    const validation = useValidation();

    if (!validation) return null;

    if (isFromHook(validation)) {
        return validation.read();
    } else {
        if (validation.isLoading) throw validation.promise;
        return validation;
    }
}
