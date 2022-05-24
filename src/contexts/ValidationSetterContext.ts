import {CompleteValidateResult, ValidateResult} from "@radiantguild/yoogi";
import {createContext} from "react";

export interface ValidationSetterContext {
    update(result: ValidateResult | null): void;
    updateInitial(result: CompleteValidateResult | null): void;
}

export const ValidationSetterContext = createContext<ValidationSetterContext | null>(null);
