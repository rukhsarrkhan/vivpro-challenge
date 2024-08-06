import { useState, useEffect, useCallback } from 'react';
import { fetchSongs as apiFetchSongs, rateSong as apiRateSong, getSongByTitle } from '../utils/api';

export const useSongData = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchSongs = useCallback(async (page = 1, perPage = 10, searchTerm = '') => {
        try {
            setLoading(true);
            const data = await apiFetchSongs(page, perPage, searchTerm);
            setSongs(data.songs);
            setTotalPages(data.pages);
            setCurrentPage(data.current_page);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const rateSong = useCallback(async (id, rating) => {
        try {
            const updatedSong = await apiRateSong(id, rating);
            setSongs(songs => songs.map(song =>
                song.id === id ? { ...song, rating: updatedSong.rating } : song
            ));
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const searchSongByTitle = useCallback(async (title) => {
        try {
            setLoading(true);
            const song = await getSongByTitle(title);
            setSongs([song]);
            setTotalPages(1);
            setCurrentPage(1);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSongs();
    }, [fetchSongs]);

    return {
        songs,
        loading,
        error,
        fetchSongs,
        rateSong,
        searchSongByTitle,
        totalPages,
        currentPage
    };
};