<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { SERVER_URL } from "../../../env";
  import { token } from "../../store";

  const codeUrl = SERVER_URL + "/login/oauth2/code/kakao" + $page.url.search;

  const getToken = () => fetch(codeUrl).then((res) => res.json());

  onMount(() => {
    getToken()
      .then((json) => ($token = json))
      .then(() => goto("/"));
  });
</script>

<h1>login callback page</h1>
