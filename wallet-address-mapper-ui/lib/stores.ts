import { create, type StoreApi, type UseBoundStore } from "zustand";
import { devtools } from "zustand/middleware";

// could follow https://docs.pmnd.rs/zustand/guides/nextjs
// but it's overkill rn

type State = {
  sendMailModalOpen: boolean;
};

type Actions = {
  setSendMailModalOpen: (isOpen: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  sendMailModalOpen: false,
};

const useStoreBase = create<State & Actions>()(
  devtools((set, _get) => ({
    ...initialState,
    setSendMailModalOpen: (isOpen) => set(() => ({ sendMailModalOpen: isOpen })),
    reset: () => {
      set(initialState);
    },
  })),
);

// from https://docs.pmnd.rs/zustand/guides/auto-generating-selectors
// makes selectors less verbose
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const useStore = createSelectors(useStoreBase);
