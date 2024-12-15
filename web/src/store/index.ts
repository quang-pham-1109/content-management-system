import { atom, getDefaultStore } from 'jotai';

export const appStore = getDefaultStore();

const appState = atom({
  isCreatePostDialogOpen: false,
});
