import {ComponentType, useContext} from "react";
import {InlineContext} from "~/contexts/InlineContext";

export interface UseInlineItemsResult {
    left?: ComponentType;
    right?: ComponentType;
}

/**
 * Returns the left and right inline items if something has set them
 *
 * @see InlineGroup
 * @see useInlineItem
 */
export function useInlineItems(): UseInlineItemsResult {
    const context = useContext(InlineContext);

    return {
        left: context?.left,
        right: context?.right
    };
}
