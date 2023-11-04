import {createElement, ReactNode} from "react";
import {NoValidationUpdateContext} from "~/contexts/NoValidationUpdateContext";

export interface NoValidationUpdatesProps {
    children: ReactNode;
}

/**
 * Nullifies any `useValidationUpdate` calls by child nodes
 *
 * @see useValidationUpdate
 */
export function NoValidationUpdates({children}: NoValidationUpdatesProps) {
    return createElement(
        NoValidationUpdateContext.Provider,
        {value: true},
        children
    )
}
