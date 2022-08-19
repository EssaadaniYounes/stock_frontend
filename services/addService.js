import { fetch } from "../lib/fetch";
import getCookie from "../utils/get-cookie";

export default async function addService(service, data) {
    const token = getCookie('token');
    const res = await fetch(service, {
        method: 'POST',
        token: token,
        data: data
    })
    return res;
}