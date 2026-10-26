import apiClient from "../api/client";

export async function getLicencia() {
    const response = await apiClient.get('/licencia');
    return response.data;
}
