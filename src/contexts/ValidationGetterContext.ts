import {ValidateResult} from "@radiantguild/yoogi";
import {createContext} from "react";

export const ValidationGetterContext = createContext<ValidateResult | null>(null);
