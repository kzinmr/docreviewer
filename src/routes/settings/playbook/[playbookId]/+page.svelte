<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import EditForm from '$/components/EditForm.svelte';

  export let form: ActionData;
  export let data: PageData;
  const { playbook } = data;
  const title = 'Edit Playbook';
  const missing = form?.missing ?? false;
  const redirectUrl = `/settings?playbookId=${playbook?.id}`;
  const updateAction = '?/updatePlaybook';
  const deleteAction = '?/deletePlaybook';
  const confirmationMassage = 'Will you really DELETE this playbook?';
</script>

<EditForm {title} {missing} {redirectUrl} {updateAction} {deleteAction} {confirmationMassage}>
  <div>
    <h2>Name</h2>
    <input name="name" placeholder="Name" type="text" value={form?.name ?? playbook?.name} />
    <h2>Description</h2>
    <textarea name="description" cols="50" placeholder="Description" rows="8"
      >{form?.description ?? playbook?.description}</textarea
    >
  </div>
</EditForm>

<style lang="postcss">
  input[type='text'],
  textarea {
    @apply w-full p-2 my-2 rounded-md border border-gray-300;
  }
</style>
