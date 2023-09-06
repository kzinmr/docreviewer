<script lang='ts'>
  import TextArea from '$components/TextAreaAutoresize.svelte'
  import { paragraphs } from '$/store';
</script>

{#if $paragraphs.length > 0}
  <div class="textarea-frame">
    <div class="flex flex-col h-screen overflow-y-auto p-8 space-y-4">
      {#each $paragraphs as paragraph}
        <TextArea bind:value={paragraph} />  
      {/each}
    </div>
  </div>
{/if}

<style lang="postcss">
  .textarea-frame {
    @apply p-4 border rounded;
  }
</style>