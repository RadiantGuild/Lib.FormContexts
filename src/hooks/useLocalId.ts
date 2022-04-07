import {useContext} from "react";
import {IdContext} from "~/contexts/IdContext";

/**
 * If there is a parent `IdProvider`, this function returns the ID it created.
 * Otherwise, it returns null.
 *
 * @see IdProvider
 */
export default function useLocalId(): string | undefined {
    return useContext(IdContext);
}
