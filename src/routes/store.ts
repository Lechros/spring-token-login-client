import { writable } from "svelte/store";

export interface Token {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
}

export const token = writable<Token>({
  token_type: "",
  access_token: "",
  expires_in: 0,
  refresh_token: "",
  refresh_token_expires_in: 0,
});
