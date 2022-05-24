import {CompleteValidateResult, ValidateResult} from "@radiantguild/yoogi";
import {
    createElement,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import {ValidationGetterContext} from "~/contexts/ValidationGetterContext";
import {ValidationSetterContext} from "~/contexts/ValidationSetterContext";

export interface ValidationProviderProps {
    children: ReactNode;
}

function getInitialState(
    base: ValidateResult | null,
    initial: CompleteValidateResult | null
) {
    return !!(initial && base?.isLoading);
}

function useCombinedValidateResult(
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
