<script lang="ts">
  import Icons from '$components/Icons.svelte';
  import { paragraphs, previousParagraphs, operationDequeue, operationUndoDequeue } from '$/store';
  import type { Operation } from '$/lib/types';

  const redoOperation = () => {
    console.log('redo: ', $operationDequeue, $operationUndoDequeue);
    const operation: Operation | undefined = $operationUndoDequeue.dequeue();
    if (operation !== undefined) {
      $operationDequeue.enqueue(operation);
      switch (operation.type) {
        case 'insert':
          if (operation.position) {
            $paragraphs.splice(operation.position, 0, '');
            $paragraphs = $paragraphs;
            $previousParagraphs = [...$paragraphs];
          }
          break;
        case 'delete':
          if (operation.position) {
            $paragraphs = $paragraphs.filter((_, index) => index !== operation.position);
            $previousParagraphs = [...$paragraphs];
          }
          break;
        case 'modify':
          if (operation.position && operation.newContent) {
            $paragraphs[operation.position] = operation.newContent;
            $paragraphs = $paragraphs;
          }
          break;
      }
    }
    console.log('redo: ', $operationDequeue, $operationUndoDequeue);
  };
</script>

<button on:click={redoOperation}><Icons type="redo" /></button>
