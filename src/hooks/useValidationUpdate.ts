import {ValidateResult} from "@radiantguild/yoogi";
import {useContext, useEffect} from "react";
import {ValidationSetterContext} from "~/contexts/ValidationSetterContext";
import {NoValidationUpdateContext} from "~/contexts/NoValidationUpdateContext";

/**
 * Sets the validation result of this input so that `useValidation` can read it.
 *
 * If a composite form field includes sub-fields with `useValidationUpdate` (or `useInputState`),
 * the composite form field should wrap those elements in `<NoValidationUpdates>` to prevent clashing updates.
 *
 * @see ValidationProvider
 * @see useValidation
 * @see NoValidationUpdates
 */
export default function useValidationUpdate(result: ValidateResult | null): void {
    const setValidateResult = useContext(ValidationSetterContext);
    const disabled = useContext(NoValidationUpdateContext);

    useEffect(() => {
        if (disabled) return;
        setValidateResult?.update(result);
    }, [disabled, setValidateResult, result]);
}

