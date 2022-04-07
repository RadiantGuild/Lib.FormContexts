import {ValidateResult} from "@radiantguild/yoogi";
import {createContext} from "react";

export interface ValidationContext {
    validateResult: ValidateResult | null;

    setValidateResult(result: ValidateResult | null): void;
}

export const ValidationContext = createContext<ValidationContext | null>(null);
