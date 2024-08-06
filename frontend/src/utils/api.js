import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchSongs = async (page = 1, perPage = 10, searchTerm = '') => {
    try {
        const response = await api.get('/songs', {
            params: { page, per_page: perPage }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
};

export const rateSong = async (id, rating) => {
    try {
        const response = await api.post(`/songs/${id}/rate`, { rating });
        return response.data;
    } catch (error) {
        console.error('Error rating song:', error);
        throw error;
    }
};

export const getSongByTitle = async (title) => {
    try {
        const response = await api.get(`/songs/${encodeURIComponent(title)}`);
        return response.data;
    } catch (error) {
        console.log("EROOR", error);
        console.error('Error fetching song by title:', error);
        throw error;
    }
};