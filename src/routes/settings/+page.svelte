<script lang="ts">
  import type { PageData } from './$types';
  import Icons from '$/components/Icons.svelte';
  import { selectedPlaybookId } from '$/store';

  // FIXME: PageDataがplaybooksしか含まず、rules以下を含まないのを自動で直したい
  interface MyPageData extends PageData {
    playbooks: {
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
    }[];
  }
  export let data: MyPageData;

  $: selectedPlaybook =
    $selectedPlaybookId !== null
      ? data.playbooks.find((playbook) => playbook.id === $selectedPlaybookId)
      : null;
</script>

{#if selectedPlaybook?.rules}
  <!-- <Playbook selectedPlaybook> -->
  <div>
    <h1>{selectedPlaybook?.name}</h1>
    <p>{selectedPlaybook?.description}</p>
    <a href={`/settings/playbook/${$selectedPlaybookId}`} class="btn m-1 btn-ghost">
      <Icons type="edit" />
    </a>
  </div>
  <h1>Rules</h1>
  <a href={`/settings/playbook/${$selectedPlaybookId}/rule/create`} class="btn btn-square btn-ghost"><Icons type="plus" /></a>
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
        {#each selectedPlaybook.rules as rule, i}
          <tr>
            <th>{i + 1}</th>
            <td>{rule.name}</td>
            <td>{rule.description}</td>
            <td>{rule.logic.pattern}</td>
            <td>{rule.logic.type}</td>
            <td>
              <a
                href={`/settings/playbook/${$selectedPlaybookId}/rule/${rule.id}`}
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
