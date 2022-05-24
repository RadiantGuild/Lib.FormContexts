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

const enum BaseValidatorState {
    alreadyComplete,
    firstLoad,
    secondLoad
}

function getInitialBaseValidatorState(
    base: ValidateResult | null
) {
    if (base?.isLoading) return BaseValidatorState.firstLoad;
    return BaseValidatorState.firstLoad;
}

function useCombinedValidateResult(
    base: ValidateResult | null,
    initial: CompleteValidateResult | null
) {
    const state = useRef(getInitialBaseValidatorState(base));
    const [combined, setCombined] = useState(() => initial ?? base);

    const initialRef = useRef(initial);

    useEffect(() => {
        const oldInitial = initialRef.current;
        initialRef.current = initial;

        setCombined(combined => {
            if (combined === oldInitial) return initial;
            return oldInitial;
        });
    }, [initial]);

    useEffect(() => {
        if (state.current === BaseValidatorState.alreadyComplete) {
            if (base?.isLoading) {
                state.current = BaseValidatorState.firstLoad;
            } else {
                setCombined(base);
            }
        } else if (state.current === BaseValidatorState.firstLoad) {
            if (base?.isLoading && initialRef.current) {
                state.current = BaseValidatorState.secondLoad;
            }

            if (!base?.isLoading && !initialRef.current) {
                state.current = BaseValidatorState.alreadyComplete;
            }
        } else if (state.current === BaseValidatorState.secondLoad) {
            setCombined(initialRef.current);

            if (!base?.isLoading) {
                state.current = BaseValidatorState.alreadyComplete;
            }
        }
    }, [base, setCombined]);

    return combined ?? initial;
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
