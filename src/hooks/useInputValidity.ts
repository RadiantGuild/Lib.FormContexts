import {useContext, useEffect} from "react";
import {FormContext} from "~/contexts/FormContext";
import {NoValidationUpdateContext} from "~/contexts/NoValidationUpdateContext";

/**
 * Notifies the wrapping form about the validity of this input
 *
 * @see FormProvider
 * @see useFormValidity
 */
export default function useInputValidity(isValid: boolean) {
    const context = useContext(FormContext);
    const disabled = useContext(NoValidationUpdateContext);

    useEffect(() => {
        if (!context || isValid || disabled) return;

        context.addInvalid();
        return () => context.removeInvalid();
    }, [context, disabled, isValid]);
}
