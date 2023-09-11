<script lang='ts'>
  import ParagraphModifyTextArea from '$/components/ParagraphModifyTextArea.svelte';
  import ParagraphInsertButton from '$/components/ParagraphInsertButton.svelte';
  import ParagraphDeleteButton from '$/components/ParagraphDeleteButton.svelte';

  export let paragraph: string;
  export let position: number;

  // function displaySpacesAndNewlines(str: string) {
  //   const visualized = str.replace(/ /g, '·').replace(/\n/g, '↵\n');
  //   console.log(visualized);
  // }
  // $: displaySpacesAndNewlines(paragraph);
  // import { operationDequeue, operationUndoDequeue } from '$/store';
  // $: console.log('operation: ', $operationDequeue, $operationUndoDequeue);

</script>

<div class="flex flex-row">
  <ParagraphModifyTextArea bind:value={paragraph} position={position} />
  <ParagraphInsertButton position={position} />
  <ParagraphDeleteButton position={position} />
</div>