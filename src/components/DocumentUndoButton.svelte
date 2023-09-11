<script lang="ts">
  import Icons from '$components/Icons.svelte';
  import { paragraphs, previousParagraphs, operationDequeue, operationUndoDequeue } from '$/store';
  import type { Operation } from '$/lib/types';

  const undoOperation = () => {
    console.log('undo: ', $operationDequeue, $operationUndoDequeue);
    const operation: Operation | undefined = $operationDequeue.pop();
    console.log(operation);
    if (operation !== undefined) {
      $operationUndoDequeue.enqueueLeft(operation);
      switch (operation.type) {
        case 'insert': {
          $paragraphs = $paragraphs.filter((_, index) => index !== operation.position);
          $previousParagraphs = [...$paragraphs];
          break;
        }
        case 'delete':
          if (operation.position && operation.oldContent !== undefined) {
            $paragraphs.splice(operation.position, 0, operation.oldContent);
            $paragraphs = $paragraphs;
            $previousParagraphs = [...$paragraphs];
          }
          break;
        case 'modify':
          if (operation.position && operation.oldContent !== undefined) {
            $paragraphs[operation.position] = operation.oldContent;
            $paragraphs = $paragraphs;
            $previousParagraphs[operation.position] = operation.oldContent;
          }
          break;
      }
    }
    console.log('undo: ', $operationDequeue, $operationUndoDequeue);
  };
</script>

<button on:click={undoOperation}><Icons type="undo" /></button>
