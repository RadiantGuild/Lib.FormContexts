import {createElement, ReactElement, ReactNode, useCallback, useMemo, useState} from "react";
import {FormContext} from "~/contexts/FormContext";

export interface FormContextProviderProps {
    children: ReactNode;
}

/**
 * Provides global state for a form
 *
 * @see useFormValidity
 * @see useInputValidity
 */
export function FormProvider({children}: FormContextProviderProps): ReactElement {
    const [invalidCount, setInvalidCount] = useState(0);

    const addInvalid = useCallback(() => {
        setInvalidCount(count => count + 1);
    }, [setInvalidCount]);

    const removeInvalid = useCallback(() => {
        setInvalidCount(count => Math.max(0, count - 1));
    }, [setInvalidCount]);

    const isInvalid = invalidCount > 0;

    const contextValue = useMemo(
        () => ({
            addInvalid,
            removeInvalid,
            isInvalid
        }),
        [addInvalid, removeInvalid, isInvalid]
    );

    return createElement(FormContext.Provider, {
        value: contextValue
    }, children);
}
