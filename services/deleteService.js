import { fetch } from "../lib/fetch";
import getCookie from "../utils/get-cookie";



export default async function deleteService(service, id) {
    if (confirm(`Are you sure you want to delete this ${service.slice(0, service.length - 1)}?`)) {
        const token = getCookie("token");

        const res = await fetch(`${service}/${id}`, {
            method: "DELETE",
            token,
        })

        return res;
    }
}