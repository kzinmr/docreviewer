<script lang="ts">
  import type { ActionData, PageData } from './$types';
  export let data: PageData;
  export let form: ActionData;
</script>

<div class="page">
  <form method="post">
    <h1>Create Rule</h1>
    {#if form?.missing}<p class="error">Missing field required!</p>{/if}
    <input name="name" placeholder="Name" type="text" value={form?.name ?? ''} />
    <textarea
      name="description"
      cols="50"
      placeholder="Description"
      rows="8"
      value={form?.description ?? ''}
    />
    <input
      name="pattern"
      placeholder="Keyword or Regex Pattern"
      type="text"
      value={form?.pattern ?? ''}
    />
    <input
      name="type"
      placeholder="Type of Pattern"
      type="text"
      value={form?.name ?? ''}
    />
    <button type="submit">Create</button>
    <a class="back" href="/settings?playbookId={data.playbookId}"> Cancel </a>
  </form>
</div>

<style lang="postcss">
  .page {
    @apply flex flex-col justify-center items-center p-12 bg-white;
  }
  input[type='text'],
  textarea {
    @apply w-full p-2 my-2 rounded-md border border-gray-300;
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
