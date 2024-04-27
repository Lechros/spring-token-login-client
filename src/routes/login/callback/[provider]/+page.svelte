<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { getToken } from "../../../../api";
  import { accessTokenExpiresAt, token } from "../../../store";

  onMount(() => {
    getToken($page.params.provider, $page.url.search)
      .then((res) => {
        $token = res.data!;
        const now = new Date().getTime() / 1000;
        $accessTokenExpiresAt = now + $token.expires_in;
      })
      .then(() => goto("/"));
  });
</script>

<h1>login callback page</h1>
