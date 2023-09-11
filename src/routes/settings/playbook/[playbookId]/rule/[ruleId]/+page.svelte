<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import EditForm from '$/components/EditForm.svelte';

  export let form: ActionData;
  export let data: PageData;
  const { rule, playbookId } = data;
  const title = 'Edit Rule';
  const missing = form?.missing ?? false;
  const redirectUrl = `/settings?playbookId=${playbookId}`;
  const updateAction = '?/updateRule';
  const deleteAction = '?/deleteRule';
  const confirmationMassage = 'Will you really DELETE this rule?';
  const my_modal_1: HTMLDialogElement | null = null;
</script>

<EditForm
  {title}
  {missing}
  {redirectUrl}
  {updateAction}
  {deleteAction}
  {confirmationMassage}
  {my_modal_1}
>
  <div>
    <h2>Name</h2>
    <input name="name" placeholder="Name" type="text" value={form?.name ?? rule?.name} />
    <h2>Description</h2>
    <textarea name="description" cols="50" placeholder="Description" rows="8"
      >{form?.description ?? rule?.description ?? ''}</textarea
    >
    <h2>Pattern</h2>
    <input
      name="pattern"
      placeholder="Keyword or Regex Pattern"
      type="text"
      value={form?.pattern ?? rule?.logic?.pattern}
    />
    <h2>Pattern Type</h2>
    <input
      name="type"
      placeholder="Type of Pattern"
      type="text"
      value={form?.type ?? rule?.logic?.type}
    />
  </div>
</EditForm>

<style lang="postcss">
  input[type='text'],
  textarea {
    @apply w-full p-2 my-2 rounded-md border border-gray-300;
  }
</style>
