import {ValidateResult} from "@radiantguild/yoogi";
import {createElement, ReactNode, useState} from "react";
import {ValidationGetterContext} from "~/contexts/ValidationGetterContext";
import {ValidationSetterContext} from "~/contexts/ValidationSetterContext";

export interface ValidationProviderProps {
    children: ReactNode;
}

/**
 * Provides validation state for a single input and label
 *
 * @see useValidation
 * @see useValidationUpdate
 */
export function ValidationProvider({children}: ValidationProviderProps) {
    const [validateResult, setValidateResult] = useState<ValidateResult | null>(
        null
    );

    return createElement(
        ValidationSetterContext.Provider,
        {value: setValidateResult},
        createElement(
            ValidationGetterContext.Provider,
            {value: validateResult},
            children
        )
    );
}
