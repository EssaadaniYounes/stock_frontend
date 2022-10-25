import { fetch } from "@/lib/fetch";

export async function autoLogin(ctx) {
    if (ctx && ctx.req.cookies.user) {
        const user = JSON.parse(ctx.req.cookies.user);
        const data = await fetch('login', {
            method: 'POST',
            data: user
        });
        return {
            dataUser: data
        }
    } else {
        return {
            dataUser: null
        }
    }
}