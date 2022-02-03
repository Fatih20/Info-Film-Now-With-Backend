import { useState, useEffect } from "react";
import useNotFirstEffect from "./useNotFirstEffect";

export default function useLocalStorage(initialValue : any, keyName : string) {
    const[value, setValue] = useState(initialValue);

    useEffect (() => {
        // localStorage.removeItem(keyName);
        const couldBeFirstValue = localStorage.getItem(keyName);
        if (couldBeFirstValue === undefined || couldBeFirstValue === null){
            setValue(initialValue)
        } else {
            setValue(JSON.parse(couldBeFirstValue));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useNotFirstEffect(() => {
        localStorage.setItem(keyName, JSON.stringify(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return [
        value, setValue
    ]


}