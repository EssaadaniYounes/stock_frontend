import { useSharedVariableStore } from "@/store/sharedVariablesStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useCloseSidebar() {
    const router = useRouter();
    const { setShowSideBar } = useSharedVariableStore(state => state);
    useEffect(() => {
        const handleRouteComplete = (url, { shallow }) => {
            setShowSideBar(false);
        }


        router.events.on('routeChangeComplete', handleRouteComplete)

        return () => {
            router.events.off('routeChangeComplet', handleRouteComplete)
        }
    }, [])
}