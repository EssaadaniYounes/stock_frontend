import { useState, useEffect } from "react";

export default function useAssing(data = null) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        if (data) {
            setItems(data)
        }
    }, [data]);
    return { items, setItems }
}