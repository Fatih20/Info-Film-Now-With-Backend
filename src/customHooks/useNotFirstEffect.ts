import { useEffect, useRef } from "react";

export default function useNotFirstEffect(callback : () => void , dependency : any[]) {
    const firstRender = useRef(true);

    useEffect (() => {
        if (firstRender.current){
            firstRender.current = false;
        } else {
            callback();
        }
    }, dependency)
}