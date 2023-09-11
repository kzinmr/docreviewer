<script lang="ts">
  export let title: string;
  export let missing: boolean;
  export let redirectUrl: string;
  export let updateAction: string;
  export let deleteAction: string;
  export let confirmationMassage: string;
  export let my_modal_1: HTMLDialogElement | null = null;
</script>

<div class="page">
  <h1>{title}</h1>
  <form method="post" class="actions">
    {#if missing}<p class="error">Missing field required!</p>{/if}
    <slot />
    <button type="submit" formaction={updateAction}>Update</button>
    <a class="back" href={redirectUrl}> Cancel </a>
  </form>
  <div class="flex align-bottom justify-end border-0">
    <button class="btn" on:click={() => my_modal_1?.showModal()}>Delete</button>
    <dialog id="my_modal_1" class="modal" bind:this={my_modal_1}>
      <div class="modal-box">
        <h3 class="font-bold text-lg">CONFIRMATION</h3>
        <p class="py-4">{confirmationMassage}</p>
        <div class="modal-action">
          <form method="post" class="actions">
            <button formaction={deleteAction} class="btn bg-red-600 hover:bg-red-700 text-white">
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
