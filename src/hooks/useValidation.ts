import {ValidateResult} from "@radiantguild/yoogi";
import {useContext} from "react";
import {ValidationGetterContext} from "~/contexts/ValidationGetterContext";

/**
 * Returns the validation result of the sibling input
 *
 * @see ValidationProvider
 * @see useValidationUpdate
 */
export default function useValidation(): ValidateResult | null {
    return useContext(ValidationGetterContext);
}
