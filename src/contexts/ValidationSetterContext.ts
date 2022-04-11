import {ValidateResult} from "@radiantguild/yoogi";
import {createContext} from "react";

export interface ValidationSetterContext {
    (result: ValidateResult | null): void;
}

export const ValidationSetterContext = createContext<ValidationSetterContext | null>(null);
