<script lang="ts">
  import DocumentOperations from '$/components/DocumentOperations.svelte';
  import ParagraphOperations from '$/components/ParagraphOperations.svelte';
  import { paragraphs, previousParagraphs } from '$/store';

  $previousParagraphs = [...$paragraphs];
</script>

{#if $paragraphs.length > 0}
  <div class="textarea-frame">
    <div class="flex flex-row space-x-1 absolute top-14 z-10 bg-white">
      <DocumentOperations />
    </div>
    <div class="flex flex-col h-screen overflow-y-auto p-8 space-y-4">
      {#each $paragraphs as paragraph, position}
        <ParagraphOperations bind:paragraph {position} />
      {/each}
    </div>
  </div>
{/if}

<style lang="postcss">
  .textarea-frame {
    @apply p-4 border rounded;
  }
</style>
