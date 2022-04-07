import {createElement, ReactElement, ReactNode, useId} from "react";
import {IdContext} from "~/contexts/IdContext";

export interface IdProviderProps {
    prefix?: string;
    children: ReactNode;
}

/**
 * Creates a unique ID and supplies it to children with `useLocalId`
 *
 * @see useLocalId
 */
export function IdProvider({prefix, children}: IdProviderProps): ReactElement {
    const id = useId();

    const prefixedId = prefix ? prefix + id : id;

    return createElement(
        IdContext.Provider,
        {
            value: prefixedId
        },
        children
    );
}
