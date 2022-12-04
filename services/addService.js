import { fetch } from "@/lib/fetch";
import getCookie from "@/utils/get-cookie";

export default async function addService(service, data, curstom_headers = {}) {
    const token = getCookie('token');
    const res = await fetch(service, {
        method: 'POST',
        token: token,
        data: data,
        curstom_headers: curstom_headers
    })
    return res;
}