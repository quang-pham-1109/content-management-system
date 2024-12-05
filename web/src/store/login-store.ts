import { appStore } from ".";
import { atomWithStorage } from "jotai/utils";

export const setTokenStore = (token: string | null) => {
  appStore.set(tokenStoreAtom, token);
};

export const tokenStoreAtom = atomWithStorage<string | null>(
  "token",
  null // default value is null
);
