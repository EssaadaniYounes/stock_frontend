import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import autoLogin from "@/services";
import getCookie from "@/utils/get-cookie";

export function useGetPermissions() {
    const { user, setUser } = useAuthStore(state => state);
    const [permissions, setPermissions] = useState({});

    useEffect(() => {
        if (user.data.permissions) {
            setPermissions(JSON.parse(user.data.permissions));
        }
        if (!user) {
            const { dataUser } = autoLogin({
                req: {
                    cookies: getCookie('user')
                }
            })
            setUser(dataUser);
        }
    }, [user?.data, user]);
    return permissions;
}