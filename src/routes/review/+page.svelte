<script lang="ts">
  import ParagraphOperations from '$/components/ParagraphOperations.svelte';
  import { paragraphs, previousParagraphs, selectedDocumentId } from '$/store';
  import type { Document, Passage } from '$/lib/types';

  $previousParagraphs = [...$paragraphs];
  let passages: Passage[] = [];

  const getDocument = async () => {
    const res = await fetch(`/api/document/${$selectedDocumentId}`, {
      method: 'GET'
    });
    const resJson: Document = await res.json();
    passages = resJson.passages;
  };

  $: if ($selectedDocumentId !== null) {
    getDocument();
  }
</script>

{#if $paragraphs.length > 0}
  <div class="textarea-frame">
    <div class="flex flex-col p-8 space-y-4">
      {#if $selectedDocumentId !== null}
        {#each passages as passage, i}
          <!-- id enables to jump to here by clicking sidebar -->
          <div id={`passage-${passage.id}`} class="grid card bg-base-300 rounded-box p-2">
            {#each passage.lines as line, j}
              <ParagraphOperations
                bind:paragraph={line.text}
                position={j + passages.slice(0, i).reduce((acc, p) => acc + p.lines.length, 0)}
              />
            {/each}
          </div>
          <div class="divider" />
        {/each}
      {:else}
        {#each $paragraphs as paragraph, position}
          <ParagraphOperations bind:paragraph {position} />
        {/each}
      {/if}
    </div>
  </div>
{/if}

<style lang="postcss">
  .textarea-frame {
    @apply p-4 border rounded;
  }
</style>
