<script lang="ts">
  import { AppShell } from '@skeletonlabs/skeleton';
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { LayoutData } from './$types';
  import type { Playbook } from '@prisma/client';
  import Icons from '$/components/Icons.svelte';
  import Header from '$/components/Header.svelte';
  import { selectedPlaybookId } from '$/store';

  const playbookIdStr = $page.url.searchParams.get('playbookId') ?? '';
  if (!isNaN(Number(playbookIdStr))) {
    $selectedPlaybookId = Number(playbookIdStr);
  }

  export let data: LayoutData;
  $: selectedPlaybook = data.playbooks.find((playbook: Playbook) => playbook.id === $selectedPlaybookId)
  let sidebarWidth = 'w-fit';
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 p-4 {sidebarWidth}" slotPageHeader="sticky top-0 z-50">
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <nav class="list-nav">
      <Accordion>
        <AccordionItem open>
          <svelte:fragment slot="lead"><Icons type="playbook" /></svelte:fragment>
          <svelte:fragment slot="summary">Playbook</svelte:fragment>
          <svelte:fragment slot="content">
            <a href="/settings/playbook/create" class="btn-icon"><Icons type="plus" /></a>
            <ul class="p-4 overflow-y-auto">
              {#each data.playbooks as playbook}
                <li>
                  <a
                    href="/settings?playbookId={$selectedPlaybookId}"
                    on:click={() => {
                      $selectedPlaybookId = playbook.id;
                      console.log($selectedPlaybookId);
                      goto(`/settings?playbookId=${$selectedPlaybookId}`);
                    }}
                    class="btn"
                    class:active={$selectedPlaybookId === playbook.id}
                    data-sveltekit-preload-data="hover">{playbook.name}</a
                  >
                  <!-- {#if $selectedPlaybookId === playbook.id}                  {/if} -->
                </li>
              {/each}
            </ul>
          </svelte:fragment>
        </AccordionItem>
      </Accordion>
    </nav>
  </svelte:fragment>

  <svelte:fragment slot="pageHeader">
    {#if selectedPlaybook !== undefined}
      <div class="card">
        <header class="card-header">Playbook</header>
        <section class="p-2">
          Name: {selectedPlaybook?.name}<br />Description: {selectedPlaybook?.description}
        </section>
        <footer class="card-footer">
          <a href="/settings/playbook/{selectedPlaybook?.id}" class="btn-icon">
            <Icons type="edit" />
          </a>
        </footer>
      </div>
    {/if}
  </svelte:fragment>
  <slot />
</AppShell>
