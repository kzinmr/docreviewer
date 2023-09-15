<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { LayoutData } from './$types';
  import Icons from '$/components/Icons.svelte';
  import SidebarPage from '$/components/SidebarPage.svelte';
  import { selectedPlaybookId } from '$/store';

  const playbookIdStr = $page.url.searchParams.get('playbookId') ?? '';
  if (!isNaN(Number(playbookIdStr))) {
    $selectedPlaybookId = Number(playbookIdStr);
  }

  export let data: LayoutData;
</script>

<SidebarPage>
  <svelte:fragment slot="sidebar-content">
    <h1>Playbooks</h1>
    <a href="/settings/playbook/create" class="btn btn-square btn-ghost"><Icons type="plus" /></a>
    <ul class="menu p-4 overflow-y-auto">
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      {#each data.playbooks as playbook}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          on:click={() => {
            $selectedPlaybookId = playbook.id;
            goto('/settings');
          }}
        >
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class:active={$selectedPlaybookId === playbook.id}>{playbook.name}</a>
        </li>
      {/each}
    </ul>
  </svelte:fragment>
  <svelte:fragment slot="page-content">
    <slot />
  </svelte:fragment>
</SidebarPage>
