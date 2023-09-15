<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import CreateForm from '$/components/CreateForm.svelte';

  export let data: PageData;
  export let form: ActionData;
  const title = 'Create ReviewPoint';
  const missing = form?.missing ?? false;
  const redirectUrl = `/settings?playbookId=${data.playbookId}`;
</script>

<CreateForm {title} {missing} {redirectUrl}>
  <div>
    <input name="name" placeholder="Name" type="text" value={form?.name ?? ''} />
    <textarea name="description" cols="50" placeholder="Description" rows="8"
      >{form?.description ?? ''}</textarea
    >
    <input
      name="pattern"
      placeholder="Keyword or Regex Pattern"
      type="text"
      value={form?.pattern ?? ''}
    />
    <input name="type" placeholder="Type of Pattern" type="text" value={form?.type ?? ''} />
  </div>
</CreateForm>

<style lang="postcss">
  input[type='text'],
  textarea {
    @apply w-full p-2 my-2 rounded-md border border-gray-300;
  }
</style>
