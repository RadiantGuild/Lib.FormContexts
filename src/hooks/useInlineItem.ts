import {ComponentType, useContext, useEffect} from "react";
import {InlineContext} from "~/contexts/InlineContext";

/**
 * Sets the inline item an input can display on either side. Throws an error if no `InlineGroup`.
 *
 * @see InlineGroup
 * @see useInlineItems
 */
export default function useInlineItem(
    side: "left" | "right",
    component: ComponentType
) {
    const context = useContext(InlineContext);

    if (!context) {
        throw new Error("Missing <InlineGroup> around inline item");
    }

    useEffect(() => {
        context.setComponent(side, component);
        return () => context.setComponent(side, null);
    }, [context, side, component]);
}
