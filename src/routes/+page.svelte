<script lang="ts">
  import naverLogin from "$lib/btnG_완성형.png";
  import { onMount } from "svelte";
  import { api, refresh } from "../api";
  import { API_URL, AUTHORIZATION_BASE_URL, REFRESH_URL } from "../env";
  import { accessTokenExpiresAt, token } from "./store";

  let apiStatus = 0;
  let apiResult = "";

  let refreshStatus = 0;

  function onApiClick() {
    api($token.access_token).then((res) => {
      apiStatus = res.status;
      apiResult = res.data!;
    });
  }

  function onRefreshClick() {
    refresh($token.refresh_token).then((res) => {
      refreshStatus = res.status;
      if (res.data) {
        $token = res.data;
        const now = new Date().getTime() / 1000;
        $accessTokenExpiresAt = now + $token.expires_in;
      }
    });
  }

  let accessTokenExpiresIn = 0;
  onMount(() => {
    setInterval(() => {
      if ($accessTokenExpiresAt > 0) {
        accessTokenExpiresIn = $accessTokenExpiresAt - new Date().getTime() / 1000;
        if (accessTokenExpiresIn < 0) {
          accessTokenExpiresIn = 0;
        }
      }
    }, 100);
  });
</script>

<h1>spring-token-login</h1>
<div>
  <a href={AUTHORIZATION_BASE_URL + "/kakao"}>
    <img
      class="login"
      src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png"
      alt="카카오 로그인"
    />
  </a>
  <a href={AUTHORIZATION_BASE_URL + "/naver"}>
    <img class="login" src={naverLogin} alt="네이버 로그인" />
  </a>
</div>

<hr />

<div>
  {API_URL}
  <button on:click={onApiClick}>API 요청하기</button>
</div>
<div>Status: {apiStatus}</div>
<div>응답: {apiResult}</div>

<hr />

<div>
  {REFRESH_URL}
  <button on:click={onRefreshClick} disabled={!$token.refresh_token}>토큰 갱신 요청하기</button>
  (refresh_token 정보가 존재해야 클릭 가능)
</div>
<div>Status: {refreshStatus}</div>

<hr />

<div>토큰 정보</div>
{#each Object.entries($token) as [key, value]}
  <div style="font-family: consolas;">
    <span style="display: inline-block; min-width: 8rem; font-weight: bold">{key}</span>
    <span>{value}</span>
  </div>
{/each}
액세스 토큰 만료까지: {Math.floor(accessTokenExpiresIn * 10) / 10}초

<style>
  .login {
    width: 180px;
  }
</style>
