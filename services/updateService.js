import { fetch } from "../lib/fetch";
import getCookie from "../utils/get-cookie";

export default async function updateService(service, id, data) {
    const token = getCookie('token');
    const res = await fetch(`${service}/${id}`, {
        method: 'PUT',
        token: token,
        data: data
    })
    return res;
}