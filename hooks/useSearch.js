import React, { useEffect } from 'react'

export default function useSearch(callBack, setState, dependencies, items) {

    useEffect(() => {
        const filtredData = items.filter(item => callBack(item))
        setState(filtredData);
    }, [dependencies]);
}

