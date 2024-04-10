import { User } from "@/services/user";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setCurrentUser: (user: User) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setCurrentUser: (user) => {
    set((state) => ({
      ...state,
      user,
    }));
  },
}));

export default useUserStore;
