<script lang="ts">
  export let missing: boolean;
  export let title: string;
  export let redirectUrl: string;
</script>

<div class="page">
  <form method="post">
    <h1>{title}</h1>
    {#if missing}<p class="error">Missing field required!</p>{/if}
    <slot />
    <button type="submit">Create</button>
    <a class="back" href={redirectUrl}>Cancel</a>
  </form>
</div>

<style lang="postcss">
  .page {
    @apply flex flex-col justify-center items-center p-12 bg-white;
  }
  button[type='submit'] {
    @apply bg-gray-200 border-0 px-8 py-4;
  }
  .back {
    @apply mx-4;
  }
  .error {
    @apply bg-red-600;
  }
</style>
