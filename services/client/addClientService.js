import { fetch } from "../../lib/fetch";

export default async function AddClient(data, token) {
    
    const res = await fetch('clients', {
        method: 'POST',
        data: data,
        token: token
    });

    return res;
}