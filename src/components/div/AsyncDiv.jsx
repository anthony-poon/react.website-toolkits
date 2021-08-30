import React, {useEffect, useRef, useState} from "react";
import {SpinnerDiv} from "./SpinnerDiv";

export const AsyncDiv = ({ onMount, children, duration = 1500, implementation = "js" }) => {
    const [loadingState, setLoadingState] = useState("loading");
    const mountRef = useRef(true);
    useEffect(() => {
        (async () => {
            await Promise.all([
                onMount && onMount(),
                new Promise(((resolve) => {
                    setTimeout(resolve, duration);
                }))
            ])
            if (mountRef.current) {
                setLoadingState("none");
            }
        })()
        return () => {
            mountRef.current = false;
        }
    }, [])
    // TODO: Error indicator
    return (
        <>
            {
                <SpinnerDiv
                    implementation={implementation}
                    state={loadingState}
                >
                    { children }
                </SpinnerDiv>
            }
        </>
    )
}