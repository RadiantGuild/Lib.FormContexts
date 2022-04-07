import {useContext} from "react";
import {FormContext} from "~/contexts/FormContext";

/**
 * Checks if the current form is valid. If called outside a form, returns null.
 *
 * @see FormProvider
 * @see useInputValidity
 */
export default function useFormValidity(): boolean | null {
    const context = useContext(FormContext);
    return context?.isInvalid ?? null;
}
