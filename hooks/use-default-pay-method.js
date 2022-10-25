import { useEffect } from "react";
import { useMainStore } from "@/store/MainStore";

export default function useDefaultPayMethod(data, setData) {

    const { payMethods } = useMainStore(state => state);

    useEffect(() => {
        if (data.method_id == 0 && payMethods.length > 0) {
            const methodId = payMethods.find(pM => pM.is_default == 1).value;
            setData({ ...data, method_id: methodId })
        }
    }, [payMethods]);
}