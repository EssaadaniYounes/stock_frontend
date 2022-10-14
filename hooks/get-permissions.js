import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

export function useGetPermissions() {
    const { user } = useAuthStore(state => state);
    const [permissions, setPermissions] = useState({});

    useEffect(() => {
        if (user.data.permissions) {
            setPermissions(JSON.parse(user.data.permissions));
        }
    }, [user.data]);
    return permissions;
}