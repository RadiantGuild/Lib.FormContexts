import {ComponentType, createContext} from "react";

export interface InlineContext {
    /**
     * The component the input displays on the left side
     */
    readonly left?: ComponentType;

    /**
     * The component the input displays on the right side
     */
    readonly right?: ComponentType;

    /**
     * Update the component that the input displays on one of its sides, or use `null` to not display anything
     */
    setComponent(side: "left" | "right", component: ComponentType | null): void;
}

export const InlineContext = createContext<InlineContext | null>(null);
