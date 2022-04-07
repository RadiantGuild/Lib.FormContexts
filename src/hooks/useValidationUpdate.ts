import {ValidateResult} from "@radiantguild/yoogi";
import {useContext, useEffect} from "react";
import {ValidationContext} from "~/contexts/ValidationContext";

/**
 * Sets the validation result of this input so that `useValidation` can read it
 *
 * @see ValidationProvider
 * @see useValidation
 */
export default function useValidationUpdate(result: ValidateResult | null): void {
    const ctx = useContext(ValidationContext);
    const setValidateResult = ctx?.setValidateResult;

    useEffect(() => {
        setValidateResult?.(result);
    }, [setValidateResult, result]);
}

