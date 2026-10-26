import apiClient from "../api/client";

export async function getTareas() {
    const response = await apiClient.get('/tareas');
    return response.data;
}
export async function getTaskById(id) {
    const response=await apiClient.get(`/tareas/${id}`);
    return response.data;
}
export async function createTask(tarea) {
    const response = await apiClient.post('/tareas', tarea);
    return response.data;
}
export async function deleteTask(id) {
    const response = await apiClient.delete(`/tareas/${id}`);
    return response.data;
}
export async function updateTask(id, tarea) {
    const response = await apiClient.put(`/tareas/${id}`, tarea);
    return response.data;
}