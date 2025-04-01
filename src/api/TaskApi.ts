import axios from 'axios';

const API_BASE_URL = 'http://localhost:4002/';

export const fetchTasks = async (filters: { [key: string]: string | null }) => {
	try {
		const response = await axios.get(`${API_BASE_URL}task-service/v1/tasks`, {
			params: filters
		});
		return response.data;  // Return the data from the API
	} catch (error) {
		throw new Error('Failed to fetch tasks');
	}
};

export const deleteTask = async (id: number) => {
	try {
		const response = await axios.delete(`${API_BASE_URL}task-service/v1/tasks/${id}`);
		return response.data;  // Return the data from the API
	} catch (error: any) {
		throw new Error('Failed to delete tasks', error);
	}
};


export const addTask = async (data: { [key: string]: string | null }) => {
	try {
		const response = await axios.post(`${API_BASE_URL}task-service/v1/tasks`, data);
		return response.data;  // Return the data from the API
	} catch (error: any) {
		throw new Error('Failed to add tasks', error);
	}
};

export const completeTask = async (id: number, data : { [key: string]: string | null }) => {
	try {
		const response = await axios.patch(`${API_BASE_URL}task-service/v1/tasks/${id}`, data);
		return response.data;  // Return the data from the API
	} catch (error: any) {
		throw new Error('Failed to complete tasks', error);
	}
};