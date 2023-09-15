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
  <!-- <Playbook selectedPlaybook> -->
  <div>
    <h1>{selectedPlaybook?.name}</h1>
    <p>{selectedPlaybook?.description}</p>
    <a href={`/settings/playbook/${$selectedPlaybookId}`} class="btn m-1 btn-ghost">
      <Icons type="edit" />
    </a>
  </div>
  <h1>ReviewPoints</h1>
  <a
    href={`/settings/playbook/${$selectedPlaybookId}/reviewPoint/create`}
    class="btn btn-square btn-ghost"
  >
    <Icons type="plus" />
  </a>
  <div class="overflow-x-auto">
    <table class="table">
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
                class="btn m-1 btn-ghost"
              >
                <Icons type="edit" />
              </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
