<script lang='ts'>
    import SidebarPage from '$/components/SidebarPage.svelte';
    import type { PageData } from './$types';
    import { selectedPlaybookId } from '$/store';

  export let data: PageData;

  $: selectedPlaybook = $selectedPlaybookId !== null
    ? data.playbooks.find(playbook => playbook.id === $selectedPlaybookId)
    : null;
</script>

<SidebarPage>
  <div slot="sidebar-content">
    <ul class="menu p-4 overflow-y-auto">
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      {#each data.playbooks as playbook}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => $selectedPlaybookId = playbook.id}>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class:active={$selectedPlaybookId === playbook.id}>{playbook.name}</a>
        </li>
      {/each}
    </ul>
  </div>
  <div slot="page-content">
    {#if selectedPlaybook?.rules}
      {#each selectedPlaybook.rules as rule}
        <li>{rule.name}</li>
      {/each}
    {/if}
  </div>

</SidebarPage>