"use client";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
export interface UserInfo {
  accessToken?: string;
  profilePic: string;
  id?: number;
  uuid?: string | null;
  first_name?: string;
  last_name?: string;
  username?: string;
  captures?: any;
  captured_me?: any;
  SessionReviewCredits?: any;
  isAdmin?: null | boolean;
  adminAccess?: null | number;
}
interface UserStore {
  user: string | null;
  userInfo: UserInfo;
  accessToken: string | null;
  persist: string | null;
  setUserInfo: (value: UserInfo | null) => void;
  setUser: (value: string | null) => void;
  setAccessToken: (value: string | null) => void;
  setPersist: (value: any) => void;
}
export const useUserStore = create<UserStore>(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        userInfo: { profilePic: "noimg.jpeg", uuid: null },
        accessToken: null,
        persist: JSON.parse(
          (typeof window !== "undefined" && localStorage.getItem("persist")) ||
            "false"
        ),
        setUserInfo: (value) =>
          set(() => ({ userInfo: value ?? { profilePic: "noimg.jpeg" } })),
        setUser: (value) => set(() => ({ user: value })),
        setAccessToken: (value) => set(() => ({ accessToken: value })),
        setPersist: (value) => set(() => ({ persist: value })),
      }),
      { name: "userStore" }
    )
  )
);
