<script>
  import { SERVER_URL } from "../env";
  import { token } from "./store";

  const apiUrl = SERVER_URL;
  const getApi = async () => {
    let res;
    try {
      res = await fetch(apiUrl, {
        headers: {
          Authorization: `${$token.token_type} ${$token.access_token}`,
        },
      });
      if (res.ok) {
        resultText = await res.text();
      }
    } finally {
      status = res?.status ?? -1;
    }
  };

  let status = -1;
  let resultText = "";

  const refreshUrl = SERVER_URL + "/oauth2/token";
  const refreshApi = async () => {
    let res;
    try {
      res = await fetch(refreshUrl, {
        method: "POST",
        body: new URLSearchParams(
          "grant_type=refresh_token&refresh_token=" +
            encodeURIComponent($token.refresh_token)
        ),
      });
      if (res.ok) {
        $token = await res.json();
      }
    } finally {
      refreshStatus = res?.status ?? -1;
    }
  };

  let refreshStatus = -1;
</script>

<h1>spring-token-login</h1>
<a href={SERVER_URL + "/oauth2/authorization/kakao"}>
  <img
    src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png"
    alt="카카오 로그인"
  />
</a>

<hr />

<div>
  {refreshUrl}
  <button on:click={getApi}>API 요청하기</button>
</div>
<div>Status: {status}</div>
<div>응답: {resultText}</div>

<hr />

<div>
  {refreshUrl}
  <button on:click={refreshApi} disabled={!$token.refresh_token}>
    토큰 갱신 요청하기
  </button>
  (refresh_token 정보가 존재해야 클릭 가능)
</div>
<div>Status: {refreshStatus}</div>

<hr />

<div>토큰 정보</div>
{#each Object.entries($token) as [key, value]}
  <div style="font-family: consolas;">
    <span style="display: inline-block; min-width: 8rem; font-weight: bold"
      >{key}</span
    >
    <span>{value}</span>
  </div>
{/each}
