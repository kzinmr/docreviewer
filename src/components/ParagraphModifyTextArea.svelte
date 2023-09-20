<script lang="ts">
  import { operationDequeue, previousParagraphs } from '$/store';

  export let value = '';
  export let position: number;
  let lineHeight = 'leading-3';
  $: if (value.length > 100) {
    lineHeight = 'p-2 leading-normal resize-y';
  } else if (value.length > 2) {
    lineHeight = 'p-2 leading-tight resize-y';
  } else {
    lineHeight = 'leading-3 resize-none';
  }

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

<div class="container flex flex-col justify-center">
  <textarea
    bind:value
    on:change={modifyTextarea}
    class="textarea {lineHeight} overflow-y-auto border-gray-200"
    id={position.toString()}
  />
</div>
