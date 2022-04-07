import {
    ComponentType,
    createElement,
    ReactElement,
    ReactNode,
    useCallback,
    useMemo,
    useState
} from "react";
import {InlineContext} from "~/contexts/InlineContext";

export interface InlineGroupProps {
    children: ReactNode;
}

/**
 * Provides the context used for an input's inline items.
 * Please note that hot reloading doesn't work well for inline items,
 * so you may need to manually refresh when editing them.
 *
 * @see useInlineItem
 * @see useInlineItems
 */
export function InlineGroup({children}: InlineGroupProps): ReactElement {
    const [leftComponent, setLeftComponent] = useState<ComponentType>();
    const [rightComponent, setRightComponent] = useState<ComponentType>();

    const setComponent = useCallback<InlineContext["setComponent"]>(
        (side, component) => {
            if (side === "left") setLeftComponent(() => component ?? undefined);
            if (side === "right")
                setRightComponent(() => component ?? undefined);
        },
        [setLeftComponent, setRightComponent]
    );

    const contextValue = useMemo<InlineContext>(
        () => ({
            left: leftComponent,
            right: rightComponent,
            setComponent
        }),
        [leftComponent, rightComponent, setComponent]
    );

    return createElement(
        InlineContext.Provider,
        {
            value: contextValue
        },
        children
    );
}
