import {useContext, useEffect} from "react";
import {FormContext} from "~/contexts/FormContext";

/**
 * Notifies the wrapping form about the validity of this input
 *
 * @see FormProvider
 * @see useFormValidity
 */
export default function useInputValidity(isValid: boolean) {
    const context = useContext(FormContext);

    useEffect(() => {
        if (!context || isValid) return;

        context.addInvalid();
        return () => context.removeInvalid();
    }, [context, isValid]);
}
