<script lang="ts">
  import { error } from '@sveltejs/kit';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { LayoutData } from './$types';
  import DocumentOperations from '$/components/DocumentOperations.svelte';
  import DocumentReviewButton from '$components/DocumentReviewButton.svelte';
  import Icons from '$/components/Icons.svelte';
  import SidebarPage from '$/components/SidebarPage.svelte';
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
    el.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
  }
</script>

<SidebarPage>
  <svelte:fragment slot="sidebar-content">
    <div class="flex flex-row space-x-1 absolute top-12 z-10 bg-base-200">
      <DocumentOperations />
    </div>
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" checked />
      <div class="collapse-title text-xl font-medium mt-10">Playbook</div>
      <div class="collapse-content">
        <select bind:value={selectedPlaybookIdLayout} class="select w-full max-w-xs">
          {#each data.playbooks as playbook}
            {#if playbook.id === data.playbook?.id}
              <option disabled selected value={playbook.id}>{playbook.name}</option>
            {:else}
              <option value={playbook.id}>{playbook.name}</option>
            {/if}
          {/each}
        </select>
        <DocumentReviewButton />
        <a href="/settings?playbookId={selectedPlaybookId}" class="btn btn-square btn-ghost">
          <Icons type="edit" />
        </a>
        <div class="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div class="collapse-title text-xl font-medium">ReviewPoints</div>
          <div class="collapse-content">
            {#if data.playbook?.reviewPoints !== undefined}
              <ul class="menu p-4 overflow-y-auto">
                {#each data.playbook?.reviewPoints as reviewPoint}
                  <a href="/settings?playbookId={selectedPlaybookId}" class="btn m-1 btn-ghost">
                    {reviewPoint.name}
                  </a>
                {/each}
              </ul>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" />
      <div class="collapse-title text-xl font-medium">Review Results</div>
      <div class="collapse-content">
        <div class="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div class="collapse-title text-lg font-small">To Be Reviewed</div>
          <div class="collapse-content">
            {#if $reviews !== undefined && $reviews.length > 0}
              <ul class="menu p-4 overflow-y-auto">
                {#each $reviews as review}
                  <div
                    on:click|preventDefault={() =>
                      jumpToPassage(`passage-${review.targetPassageId}`)}
                    class="btn m-1 btn-ghost"
                  >
                    ReviewPoint: {review.reviewPoint.name}
                  </div>
                  <p>{review.reviewPoint.description}</p>
                {/each}
              </ul>
            {:else}
              <p>No Review Results</p>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="page-content">
    <slot />
  </svelte:fragment>
</SidebarPage>
