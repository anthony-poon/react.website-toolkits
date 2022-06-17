import {useEffect, useState} from "react";
import {setErrorMsg} from "../redux";
import {useDispatch} from "react-redux";

export const makeAsyncFetch = (onFetch, onError) => {
    return (...args) => {
        const dispatch = useDispatch();
        const [ isLoading, setLoading ] = useState(true);
        const [ payload, setPayload ] = useState(null);
        const [ isError, setError ] = useState(false);
        const refresh = async () => {
            try {
                setLoading(true);
                setError(false);
                const payload = await onFetch(...args);
                setPayload(payload)
                setLoading(false)
            } catch (e) {
                setError(true);
                setLoading(false);
                if (onError) {
                    onError(e);
                } else {
                    dispatch(setErrorMsg(e));
                }
            }
        };
        useEffect(() => {
            refresh();
        }, [...args]);
        return { payload, isLoading, isError, refresh }
    }
}