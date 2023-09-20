<script lang="ts">
  export let title: string;
  export let missing: boolean;
  export let redirectUrl: string;
  export let updateAction: string;
  export let deleteAction: string;
  export let confirmationMassage: string;

  import { getModalStore } from '@skeletonlabs/skeleton';
  import type { ModalSettings } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';

  // TODO: 動作確認(まずDELETEが成功すること、次にformactionにmodal挟むのが成功すること)
  const modalStore = getModalStore();
  async function modalConfirm() {
    const formdata = new FormData(); // formactionには必要
    const modal: ModalSettings = {
      type: 'confirm',
      title: 'Please Confirm',
      body: confirmationMassage,
      response: async (r: boolean) =>
        r
          ? fetch($page.url + deleteAction, { method: 'POST', body: formdata })
          : console.log('canceled')
    };
    modalStore.trigger(modal);
  }
</script>

<div class="flex flex-col justify-center items-center p-12">
  <h1>{title}</h1>
  <form method="post" class="actions">
    {#if missing}<p class="error">Missing field required!</p>{/if}
    <slot />
    <button type="submit" class="btn variant-filled" formaction={updateAction}>Update</button>
    <a class="btn" href={redirectUrl}> Cancel </a>
    <button type="submit" class="btn variant-filled-error" formaction={deleteAction}>Delete</button>
  </form>
</div>
