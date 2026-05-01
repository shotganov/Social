import type { RootState } from "@app/store";

export const selectToken = (state: RootState) => state.auth.token;
