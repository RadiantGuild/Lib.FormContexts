import {ValidateResult} from "@radiantguild/yoogi";
import {useContext, useEffect} from "react";
import {ValidationSetterContext} from "~/contexts/ValidationSetterContext";

/**
 * Sets the validation result of this input so that `useValidation` can read it
 *
 * @see ValidationProvider
 * @see useValidation
 */
export default function useValidationUpdate(result: ValidateResult | null): void {
    const setValidateResult = useContext(ValidationSetterContext);

    useEffect(() => {
        setValidateResult?.(result);
    }, [setValidateResult, result]);
}

