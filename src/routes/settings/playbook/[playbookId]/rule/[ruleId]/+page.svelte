<script lang="ts">
  import type { ActionData, PageData } from './$types';

  export let form: ActionData;
  export let data: PageData;
  const { rule, playbookId } = data;
</script>

<div class="page">
  <h1>Edit Rule</h1>
  <form method="post" class="actions">
    {#if form?.missing}<p class="error">Missing field required!</p>{/if}
    <h2>Name</h2>
    <input
      name="name"
      placeholder="Name"
      type="text"
      value={form?.name ?? rule?.name}
    />
    <h2>Description</h2>
    <textarea
      name="description"
      cols="50"
      placeholder="Description"
      rows="8"
      value={form?.description ?? rule?.description}
    />
    <h2>Pattern</h2>
    <input
      name="pattern"
      placeholder="Keyword or Regex Pattern"
      type="text"
      value={form?.pattern ?? rule?.logic.pattern}
    />
    <h2>Pattern Type</h2>
    <input
      name="type"
      placeholder="Type of Pattern"
      type="text"
      value={form?.name ?? rule?.logic.type}
    />
    <button type="submit" formaction="?/updateRule">Update</button>
    <a class="back" href="/settings?playbookId={playbookId}"> Cancel </a>
  </form>
  <div class="flex align-bottom justify-end border-0">
    <button class="btn" onclick="my_modal_1.showModal()">Delete Rule</button>
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">CONFIRMATION</h3>
        <p class="py-4">Will you really DELETE this rule?</p>
        <div class="modal-action">
          <form method="post" class="actions">
            <button
              formaction="?/deletePlaybook"
              class="btn bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </button>
          </form>
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
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
