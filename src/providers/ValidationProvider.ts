import {ValidateResult} from "@radiantguild/yoogi";
import {createElement, ReactNode, useMemo, useState} from "react";
import {ValidationContext} from "~/contexts/ValidationContext";

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

    const contextValue = useMemo<ValidationContext>(
        () => ({
            validateResult,
            setValidateResult
        }),
        [validateResult, setValidateResult]
    );

    return createElement(
        ValidationContext.Provider,
        {
            value: contextValue
        },
        children
    );
}
