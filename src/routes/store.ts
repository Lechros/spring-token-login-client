import { writable } from "svelte/store";
import type { Token } from "../api";

export const token = writable<Token>({
  token_type: "",
  access_token: "",
  expires_in: 0,
  refresh_token: "",
  refresh_token_expires_in: 0,
});

export const accessTokenExpiresAt = writable<number>(0);
