import React from "react";
import create from "zustand";
import { useUserStore } from "../store/userStore";
import Ably from "ably/promises";
import { apiPrivate } from "../api/api";
import { trpc } from "@utils/trpc";
const cid = useUserStore.getState().userInfo.uuid;
const ably = new Ably.Realtime({
  authCallback: async ({}, callback) => {
    console.log("im being hit");
    try {
      const tokenDetails = await apiPrivate.get(`/ablyAuth${`?cid=${cid}`}`);
      console.log("im being hit also");
      // const { data: tokenDetails, isSuccess } = trpc.ably.getAuth.useQuery({
      //   client_id: cid,
      // });
      console.log(tokenDetails);
      callback(null, tokenDetails.data);
    } catch (error) {
      console.log(error);
      callback(error, null);
    }
  },
});
const AblyStore = create((set) => ({
  ably: ably,
}));

export default AblyStore;
