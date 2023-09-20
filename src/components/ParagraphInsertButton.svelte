<script lang="ts">
  import Icons from '$components/Icons.svelte';
  import { paragraphs, previousParagraphs, operationDequeue } from '$/store';

  export let position: number;

  const insertTextarea = () => {
    $paragraphs.splice(position + 1, 0, '');
    $paragraphs = $paragraphs;
    $previousParagraphs = [...$paragraphs];
    $operationDequeue.enqueue({
      type: 'insert',
      position: position + 1
    });
  };
</script>

<button on:click={insertTextarea} class="btn-icon">
  <Icons type="plus" />
</button>
