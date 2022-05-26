import {CompleteValidateResult, ValidateResult} from "@radiantguild/yoogi";
import {useEffect, useRef, useState} from "react";

function getInitialState(
    base: ValidateResult | null,
    initial: CompleteValidateResult | null
) {
    return !!(initial && base?.isLoading);
}

export function useCombinedValidateResult(
    base: ValidateResult | null,
    initial: CompleteValidateResult | null
) {
    const wasLoadingWhenInitialUpdated = useRef(getInitialState(base, initial));
    const baseRef = useRef(base);

    const [combined, setCombined] = useState(base);

    useEffect(() => {
        baseRef.current = base;

        if (!wasLoadingWhenInitialUpdated.current && !base?.isLoading) {
            setCombined(base);
        }

        if (wasLoadingWhenInitialUpdated.current && base?.isLoading) {
            wasLoadingWhenInitialUpdated.current = false;
        }
    }, [baseRef, base, setCombined, wasLoadingWhenInitialUpdated]);

    useEffect(() => {
        if (!initial) return;

        setCombined(initial);

        if (baseRef.current?.isLoading) {
            wasLoadingWhenInitialUpdated.current = true;
        }
    }, [initial, setCombined, baseRef, wasLoadingWhenInitialUpdated]);

    return combined ?? base;
}
