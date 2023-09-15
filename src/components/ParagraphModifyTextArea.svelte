<script lang="ts">
  import { operationDequeue, previousParagraphs } from '$/store';

  export let value = '';
  export let position: number;

  const modifyTextarea = () => {
    // console.log(`${$previousParagraphs[position]} -> ${value}`);
    $operationDequeue.enqueue({
      type: 'modify',
      position: position,
      newContent: value,
      oldContent: $previousParagraphs[position]
    });
    $previousParagraphs[position] = value;
  };
</script>

<div class="container">
  <pre aria-hidden="true">{value}</pre>
  <textarea bind:value on:change={modifyTextarea} class="textarea" id={position.toString()}
  ></textarea>
</div>

<style lang="postcss">
  .container {
    position: relative;
  }

  pre,
  textarea {
    @apply p-2 border border-gray-200 box-border leading-5 overflow-hidden min-h-min;
    font-family: inherit;
  }

  textarea {
    @apply absolute w-full h-full top-0 resize-none overflow-y-auto;
  }
</style>
