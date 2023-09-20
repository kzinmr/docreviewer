<script lang="ts">
  export let title: string;
  export let missing: boolean;
  export let redirectUrl: string;
</script>

<div class="flex flex-col justify-center items-center p-12">
  <h1>{title}</h1>
  <form method="post">
    {#if missing}<p class="error">Missing field required!</p>{/if}
    <slot />
    <button class="btn variant-filled" type="submit">Create</button>
    <a class="btn" href={redirectUrl}>Cancel</a>
  </form>
</div>
