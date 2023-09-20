<script lang="ts">
  import type { PageData } from './$types';
  import Icons from '$/components/Icons.svelte';
  import { selectedPlaybookId } from '$/store';
  import type { Playbook } from '@prisma/client';

  export let data: PageData;

  $: selectedPlaybook =
    $selectedPlaybookId !== null
      ? data.playbooks.find((playbook: Playbook) => playbook.id === $selectedPlaybookId)
      : null;
</script>

{#if selectedPlaybook?.reviewPoints}
  <div class="card">
    <header class="card-header">ReviewPoints</header>
    <section class="p-2">
      <!-- Responsive Table Container -->
      <div class="table-container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Pattern</th>
              <th>Pattern Type</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {#each selectedPlaybook.reviewPoints as reviewPoint, i}
              <tr>
                <th>{i + 1}</th>
                <td>{reviewPoint.name}</td>
                <td>{reviewPoint.description}</td>
                <td>{reviewPoint.logic?.pattern}</td>
                <td>{reviewPoint.logic?.type}</td>
                <td>
                  <a
                    href={`/settings/playbook/${$selectedPlaybookId}/reviewPoint/${reviewPoint.id}`}
                    class="btn-icon"
                  >
                    <Icons type="edit" />
                  </a>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
    <footer class="card-footer">
      <a href="/settings/playbook/{$selectedPlaybookId}/reviewPoint/create" class="btn-icon">
        <Icons type="plus" />
      </a>
    </footer>
  </div>
{/if}
