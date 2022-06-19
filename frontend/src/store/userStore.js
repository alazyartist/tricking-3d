import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useUserStore = create(
	devtools(
		persist((set) => ({
			user: null,
			userInfo: { profilePic: "noimg.jpeg" },
			accessToken: null,
			persist: JSON.parse(localStorage.getItem("persist")) || false,
			setUserInfo: (value) => set(() => ({ userInfo: value })),
			setUser: (value) => set(() => ({ user: value })),
			setAccessToken: (value) => set(() => ({ accessToken: value })),
			setPersist: (value) => set(() => ({ persist: value })),
		}))
	)
);
