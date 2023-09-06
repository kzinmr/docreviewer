<script lang="ts">
  import SidebarPage from '$/components/SidebarPage.svelte';
  import Icons from '$/components/Icons.svelte';
  import { page } from '$app/stores';
  import type { LayoutData } from './$types';
  import { error } from '@sveltejs/kit';
  import { goto } from '$app/navigation';

  interface MyPageData extends LayoutData {
    playbook: {
      id: number;
      name: string;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
      type: string;
      authorId: number | null;
      rules: {
        id: number;
        name: string;
        description: string | null;
        logic: {
          pattern: string;
          type: string;
        };
      }[];
    };
  }
  export let data: MyPageData;
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
  let selectedPlaybookId: number = Number(playbookIdStrUrl);
  $: if (selectedPlaybookId !== Number(playbookIdStrUrl)) {
    goto(`/review?playbookId=${selectedPlaybookId}`);
  }
</script>

<SidebarPage>
  <div slot="sidebar-content">
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" />
      <div class="collapse-title text-xl font-medium">Playbook</div>
      <div class="collapse-content">
        <select bind:value={selectedPlaybookId} class="select w-full max-w-xs">
          {#each data.playbooks as playbook}
            {#if playbook.id === data.playbook.id}
              <option disabled selected value={playbook.id}>{playbook.name}</option>
            {:else}
              <option value={playbook.id}>{playbook.name}</option>
            {/if}
          {/each}
        </select>
        <a href="/settings?playbookId={selectedPlaybookId}" class="btn btn-square btn-ghost">
          <Icons type="edit" />
        </a>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" />
      <div class="collapse-title text-xl font-medium">Review Rules</div>
      <div class="collapse-content">
        <ul class="menu p-4 overflow-y-auto">
          {#each data.playbook.rules as rule}
            <a href="/settings?playbookId={selectedPlaybookId}" class="btn m-1 btn-ghost">{rule.name}</a>
          {/each}
        </ul>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" checked />
      <div class="collapse-title text-xl font-medium">Review Results</div>
      <div class="collapse-content">
        <div class="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-3" checked />
          <div class="collapse-title text-lg font-small">To Be Reviewed</div>
          <div class="collapse-content">
            <p>blank</p>
          </div>
        </div>
        <div class="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div class="collapse-title text-lg font-small">Ignored</div>
          <div class="collapse-content">
            <p>blank</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div slot="page-content">
    <slot />
  </div>
</SidebarPage>
