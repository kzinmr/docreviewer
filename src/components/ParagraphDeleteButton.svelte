<script lang="ts">
  import Icons from '$components/Icons.svelte';
  import { paragraphs, previousParagraphs, operationDequeue } from '$/store';

  export let position: number;

  const deleteTextarea = () => {
    $operationDequeue.enqueue({
      type: 'delete',
      position: position,
      oldContent: $paragraphs[position]
    });
    $paragraphs = $paragraphs.filter((_, index) => index !== position);
    $previousParagraphs = [...$paragraphs];
  };
</script>

<button on:click={deleteTextarea} class="btn-icon">
  <Icons type="minus" />
</button>
