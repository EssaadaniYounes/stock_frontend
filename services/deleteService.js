import { fetch } from "../lib/fetch";
import getCookie from "../utils/get-cookie";
export default async function deleteService(service, id, name = null) {
    const message = `Are you sure you want to delete this ${name ? name : service.slice(0, service.length - 1)}?`;
    if (confirm(message)) {
        const token = getCookie("token");

        const res = await fetch(`${service}/${id}`, {
            method: "DELETE",
            token,
        })

        return res;
    }
    return false;
}