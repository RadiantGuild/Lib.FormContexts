import {ValidateResult} from "@radiantguild/yoogi";
import {useContext} from "react";
import {ValidationContext} from "~/contexts/ValidationContext";

/**
 * Returns the validation result of the sibling input
 *
 * @see ValidationProvider
 * @see useValidationUpdate
 */
export default function useValidation(): ValidateResult | null {
    return useContext(ValidationContext)?.validateResult ?? null;
}
