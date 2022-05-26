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

    // true if it changed in this render
    const initialJustChanged = useRef(false);

    // true if it changed last render
    const [hadJustChanged, setHadJustChanged] = useState(false);

    const [combined, setCombined] = useState(base);

    useEffect(() => {
        baseRef.current = base;

        if (initialJustChanged.current) return;

        if (!wasLoadingWhenInitialUpdated.current && !base?.isLoading) {
            setCombined(base);
        }

        if (wasLoadingWhenInitialUpdated.current && base?.isLoading) {
            wasLoadingWhenInitialUpdated.current = false;
        }
    }, [
        baseRef,
        initialJustChanged,
        base,
        setCombined,
        wasLoadingWhenInitialUpdated
    ]);

    useEffect(() => {
        if (!initial) return;

        // takes effect instantly
        initialJustChanged.current = true;

        // only takes effect next render
        setHadJustChanged(true);

        setCombined(initial);

        if (baseRef.current?.isLoading) {
            wasLoadingWhenInitialUpdated.current = true;
        }
    }, [
        initial,
        initialJustChanged,
        setHadJustChanged,
        setCombined,
        baseRef,
        wasLoadingWhenInitialUpdated
    ]);

    useEffect(() => {
        if (!hadJustChanged) return;

        // clear after it has been on for one render
        initialJustChanged.current = false;
        setHadJustChanged(false);
    }, [hadJustChanged, setHadJustChanged]);

    return combined ?? initial;
}
