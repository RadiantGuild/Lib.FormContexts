import {CompleteValidateResult} from "@radiantguild/yoogi";
import {useContext, useEffect} from "react";
import {ValidationSetterContext} from "~/contexts/ValidationSetterContext";

/**
 * - If the current validation result is a complete result,
 *   this hook replaces its value with the passed result, until `useValidationUpdate` changes it again.
 *
 * - If the current validation result is a loading result,
 *   this hook replaces its value until the second time `useValidationUpdate`.
 *
 * - When the base validation result is null, its value always falls back to this one.
 *
 * - Passing `null` clears the initial value, but not the base value.
 */
export default function useInitialValidationUpdate(
    result: CompleteValidateResult | null
) {
    const setValidateResult = useContext(ValidationSetterContext);

    useEffect(() => {
        setValidateResult?.updateInitial(result);
    }, [setValidateResult, result]);
}
