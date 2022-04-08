import {AsyncValidationOptions, Validator} from "@radiantguild/yoogi";
import {useValidation} from "@radiantguild/yoogi/hook";
import {useCallback, useDeferredValue, useEffect, useState} from "react";
import useInputValidity from "~/hooks/useInputValidity";
import useLocalId from "~/hooks/useLocalId";
import useValidationUpdate from "~/hooks/useValidationUpdate";

const emptyValidatorArray: readonly Validator[] = [];

/**
 * Props that an input should expose, and pass to the `useInputState` hook
 */
export interface UseInputStateProps {
    /**
     * The current value of the input
     */
    value: string;

    /**
     * Yoogi validators, which are used to control the form's validation state
     */
    validators?: readonly Validator[];

    /**
     * Override for the options passed to Yoogi
     *
     * @default {sequential: true}
     */
    validationOptions?: AsyncValidationOptions;

    /**
     * Listener for when the value of the input changes
     * @param value The new input value
     */
    onChange(value: string): void;
}

export interface ChangeEvent {
    currentTarget: {
        value: string;
    };
}

export interface UseInputStateResult {
    /**
     * The ID supplied by an ID provider if one exists, otherwise undefined
     */
    id: string | undefined;

    /**
     * You should pass this to the input element as its `onChange` prop
     */
    handleChange(e: ChangeEvent): void;
}

/**
 * Provides common controls for an input, including validation and change events
 */
export function useInputState({
    value,
    validators,
    validationOptions = {sequential: true},
    onChange
}: UseInputStateProps): UseInputStateResult {
    const id = useLocalId();

    const [edited, setEdited] = useState(false);

    const handleChange = useCallback((e: ChangeEvent) => {
        onChange(e.currentTarget.value);
    }, [onChange]);

    const deferredValue = useDeferredValue(value);

    const validateResult = useValidation(
        deferredValue,
        validators ?? emptyValidatorArray,
        validationOptions
    ).read();

    useEffect(() => {
        if (value) setEdited(true);
    }, [value]);

    useValidationUpdate(edited ? validateResult : null);
    useInputValidity(validateResult.isValid);

    return {
        id,
        handleChange
    };
}
