import axios from 'axios';
import { getApiData } from '../api/api';

export const getAuthToken = async () => {
    const { url, body } = getApiData('authenticate');
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json()
    return json

}