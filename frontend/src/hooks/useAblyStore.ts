import React from "react";
import create from "zustand";
import { useUserStore } from "../store/userStore";
import Ably from "ably/promises";
import { apiPrivate } from "../api/api";
const cid = useUserStore.getState().userInfo.uuid;
const ably = new Ably.Realtime({
  authCallback: async ({}, callback) => {
    try {
      const tokenDetails = await apiPrivate.get(`/ablyAuth?clientId=${cid}`);
      console.log(tokenDetails);
      tokenDetails && callback(null, tokenDetails?.data);
    } catch (error) {
      callback(error, null);
    }
  },
});
const useAblyStore = create((set) => ({
  ably: ably,
}));

export default useAblyStore;
