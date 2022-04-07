import {createContext} from "react";

export interface FormContext {
    isInvalid: boolean;

    addInvalid(): void;

    removeInvalid(): void;
}

export const FormContext = createContext<FormContext | null>(null);
