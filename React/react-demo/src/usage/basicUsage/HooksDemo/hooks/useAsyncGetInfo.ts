import React, { useState, useEffect } from "react";

async function getInfo(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello");
        }, 1000)        
    })
}


const useAsyncGetInfo = () => {
    const [info, setInfo] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getInfo().then((res) => {
            setInfo(res);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setIsLoading(false);
        })
    }, []);
    return {info, isLoading, error};
}

export default useAsyncGetInfo;