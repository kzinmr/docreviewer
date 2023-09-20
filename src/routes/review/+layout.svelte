<script lang="ts">
  import { AppShell } from '@skeletonlabs/skeleton';
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
  import { error } from '@sveltejs/kit';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { LayoutData } from './$types';
  import DocumentOperations from '$/components/DocumentOperations.svelte';
  import DocumentReviewButton from '$components/DocumentReviewButton.svelte';
  import Icons from '$/components/Icons.svelte';
  import Header from '$/components/Header.svelte';
  import { selectedPlaybookId, reviews } from '$/store';

  export let data: LayoutData;
  if (!data) {
    throw error(500, {
      message: 'No data'
    });
  }

  const playbookIdStrUrl = $page.url.searchParams.get('playbookId') ?? '';
  if (isNaN(Number(playbookIdStrUrl))) {
    throw error(500, {
      message: 'Invalid playbookId'
    });
  }
  let selectedPlaybookIdLayout: number = Number(playbookIdStrUrl);
  $selectedPlaybookId = selectedPlaybookIdLayout;
  $: if (selectedPlaybookIdLayout !== Number(playbookIdStrUrl)) {
    $selectedPlaybookId = selectedPlaybookIdLayout;
    goto(`/review?playbookId=${selectedPlaybookIdLayout}`);
  }

  function jumpToPassage(passageId: string) {
    const el = document.getElementById(passageId);
    if (!el) return;
    el.scrollIntoView();
  }

  let sidebarWidth = 'w-fit';
  let isSidebarVisible = true;
  let hideSidebar = '';
  function toggleSidebar() {
    isSidebarVisible = !isSidebarVisible;
    hideSidebar = hideSidebar === 'hidden' ? '' : 'hidden';
  }
</script>

<AppShell
  slotsidebarRight="bg-surface-500/5 p-4 {sidebarWidth} {hideSidebar}"
  slotPageHeader="sticky top-0 z-50"
>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>

  <div slot="sidebarRight" class="flex flex-row h-screen">
    {#if isSidebarVisible}
      <nav class="list-nav">
        <button on:click={toggleSidebar} class="btn" tabindex="0"
          ><Icons type="close-right-panel" /></button
        >
        <Accordion>
          <AccordionItem open>
            <svelte:fragment slot="lead"><Icons type="playbook" /></svelte:fragment>
            <svelte:fragment slot="summary">Playbook</svelte:fragment>
            <svelte:fragment slot="content">
              <div class="flex flex-row">
                <select bind:value={selectedPlaybookIdLayout} class="select max-w-xs break-words">
                  {#each data.playbooks as playbook}
                    {#if playbook.id === data.playbook?.id}
                      <option disabled selected value={playbook.id}>{playbook.name}</option>
                    {:else}
                      <option value={playbook.id}>{playbook.name}</option>
                    {/if}
                  {/each}
                </select>
                <DocumentReviewButton />
              </div>
              <a
                href="/settings?playbookId={selectedPlaybookId}"
                class="btn-icon"
                data-sveltekit-preload-data="hover"
              >
                <Icons type="edit" />
              </a>
            </svelte:fragment>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="lead"><Icons type="reviewpoint" /></svelte:fragment>
            <svelte:fragment slot="summary">ReviewPoints</svelte:fragment>
            <svelte:fragment slot="content">
              {#if data.playbook?.reviewPoints !== undefined}
                <ul class="list p-4 overflow-y-auto">
                  {#each data.playbook?.reviewPoints as reviewPoint}
                    <li class="max-w-xs break-words">{reviewPoint.name}</li>
                  {/each}
                </ul>
              {/if}
            </svelte:fragment>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="lead"><Icons type="reviewresult" /></svelte:fragment>
            <svelte:fragment slot="summary">Review Results</svelte:fragment>
            <svelte:fragment slot="content">
              {#if $reviews !== undefined && $reviews.length > 0}
                <ul class="p-4 overflow-y-auto">
                  {#each $reviews as review}
                    <button
                      on:click|preventDefault={() =>
                        jumpToPassage(`passage-${review.targetPassageId}`)}
                      class="btn m-1"
                    >
                      {review.reviewPoint.name}
                    </button>
                    <p class="max-w-xs break-words">{review.reviewPoint.description}</p>
                  {/each}
                </ul>
              {/if}
            </svelte:fragment>
          </AccordionItem>
        </Accordion>
      </nav>
    {/if}
  </div>

  <svelte:fragment slot="pageHeader">
    <DocumentOperations />
    {#if !isSidebarVisible}
      <button on:click={toggleSidebar} class="btn absolute top-0 -right-0"
        ><Icons type="open-right-panel" /></button
      >
    {/if}
  </svelte:fragment>
  <slot />
</AppShell>
