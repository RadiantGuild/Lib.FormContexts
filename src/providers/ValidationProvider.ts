import {CompleteValidateResult, ValidateResult} from "@radiantguild/yoogi";
import {createElement, ReactNode, useMemo, useState} from "react";
import {ValidationGetterContext} from "~/contexts/ValidationGetterContext";
import {ValidationSetterContext} from "~/contexts/ValidationSetterContext";
import {useCombinedValidateResult} from "~/hooks/useCombinedValidateResult";

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
    const [initialValidateResult, setInitialValidateResult] =
        useState<CompleteValidateResult | null>(null);

    const [validateResult, setValidateResult] = useState<ValidateResult | null>(
        null
    );

    const contextValue = useMemo(
        () => ({
            update: setValidateResult,
            updateInitial: setInitialValidateResult
        }),
        [setValidateResult, setInitialValidateResult]
    );

    const combinedValidateResult = useCombinedValidateResult(
        validateResult,
        initialValidateResult
    );

    return createElement(
        ValidationSetterContext.Provider,
        {value: contextValue},
        createElement(
            ValidationGetterContext.Provider,
            {value: combinedValidateResult},
            children
        )
    );
}
