/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface ChatStore {
  users: any[];
  fetchUsers: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export const useChatStore = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/users');
      set({ users: response.data });
    } catch (err: any) {
      console.log("Error in useChatStore", err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },
}));