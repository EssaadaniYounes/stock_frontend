import axios from "axios";

export const fetch = async (url, options) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const { data, token, method, curstom_headers, req } = options;

    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...curstom_headers
    }
    try {
        const response = await axios({
            method: method ?? 'GET',
            url: apiUrl + url,
            headers,
            data
        });
        if (response.status == 401) return req;
        return response.data;
    } catch (error) {
        return {};
    }
}