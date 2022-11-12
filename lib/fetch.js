import axios from "axios";

export const fetch = async (url, options) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const { data, token, method, curstom_headers } = options;

    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...curstom_headers
    }
    const response = await axios({
        method: method ?? 'GET',
        url: apiUrl + url,
        headers,
        data
    });

    return response.data;
}