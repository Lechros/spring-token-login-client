<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { getToken } from "../../../../api";
  import { accessTokenExpiresAt, redirectUri, token } from "../../../store";

  onMount(() => {
    $redirectUri = $page.url.origin + $page.url.pathname;
    getToken($page.params.provider, $page.url.search)
      .then((res) => {
        if (res.data) {
          $token = res.data;
          const now = new Date().getTime() / 1000;
          $accessTokenExpiresAt = now + $token.expires_in;
        } else {
          alert("ERROR: " + res.status);
        }
      })
      .finally(() => goto("/"));
  });
</script>

<h1>login callback page</h1>
