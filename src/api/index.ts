import { API_URL, CODE_BASE_URL, REFRESH_URL } from "../env";

export interface Result<T> {
  status: number;
  data: T | undefined;
}

export interface Token {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
}

function success<T>(status: number, data: T): Result<T> {
  return { status, data };
}

function fail(): Result<any> {
  return { status: -1, data: null };
}

export async function api(accessToken: string, tokenType = "Bearer"): Promise<Result<string>> {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `${tokenType} ${accessToken}`,
    },
  });
  if (res.ok) {
    return success(res.status, await res.text());
  }
  return fail();
}

export async function refresh(refreshToken: string): Promise<Result<Token>> {
  const res = await fetch(REFRESH_URL, {
    method: "POST",
    body: new URLSearchParams([
      ["grant_type", "refresh_token"],
      ["refresh_token", encodeURIComponent(refreshToken)],
    ]),
  });
  if (res.ok) {
    return success(res.status, await res.json());
  }
  return fail();
}

export async function getToken(provider: string, search: string): Promise<Result<Token>> {
  const res = await fetch(`${CODE_BASE_URL}/${provider}${search}`);
  if (res.ok) {
    return success(res.status, await res.json());
  }
  return fail();
}
