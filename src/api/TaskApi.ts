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
