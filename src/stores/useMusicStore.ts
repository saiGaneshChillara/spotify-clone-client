/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/lib/axios';
import { Album, Song, Stats } from '@/types';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  featuredSongs: Song[];

  stats: Stats;

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (albumId: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;

  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;

  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
};

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  trendingSongs: [],
  featuredSongs: [],

  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalArtists: 0,
    totalUsers: 0,
  },

  fetchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get('/albums');
      set({ albums: response.data });
    } catch (err: any) {
      console.log('Error in use Music store', err);
      set({ error: err.response.data.message })
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById: async (albumId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${albumId}`);
      set({ currentAlbum: response.data });
    } catch (err: any) {
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/songs/featured');
      set({ featuredSongs: response.data });
    } catch (err: any) {
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false })
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/songs/made-for-you');
      set({ madeForYouSongs: response.data });
    } catch (err: any) {
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/songs/trending');
      set({ trendingSongs: response.data });
    } catch (err: any) {
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchStats: async () => {
    // await axiosInstance.get('/stats');
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs");
      set({ songs: response.data });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSong: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await axiosInstance.delete(`/admin/songs/${id}`);

      set(state => ({
        songs: state.songs.filter(song => song._id !== id)
      }));
      toast.success("Song deleted successfully");
    } catch (err: any) {
      toast.error("Error in deleting the song");
      console.log("err", err.message);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteAlbum: async (id: string) => {
    try {
      set({ isLoading: true });
      await axiosInstance.delete(`/admin/albums/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) => song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song),
      }));
      toast.success("Albmu deleted sucessfully");
    } catch (err: any) {
      console.log("Error in deleting the album: ", err.message);
      toast.error("Failed to delete the album");
    } finally {
      set({ isLoading: false });
    }
  },
}));