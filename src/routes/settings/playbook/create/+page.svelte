<script lang="ts">
  import type { ActionData } from './$types';
  import CreateForm from '$/components/CreateForm.svelte';

  export let form: ActionData;
  const title = 'Create Playbook';
  const missing = form?.missing ?? false;
  const redirectUrl = '/settings';
</script>

<CreateForm {title} {missing} {redirectUrl}>
  <div>
    <input name="name" placeholder="Name" type="text" value={form?.name ?? ''} />
    <textarea name="description" cols="50" placeholder="Description" rows="8"
      >{form?.description ?? ''}</textarea
    >
  </div>
</CreateForm>

<style lang="postcss">
  input[type='text'],
  textarea {
    @apply w-full p-2 my-2 rounded-md border border-gray-300;
  }
</style>
