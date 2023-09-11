<script lang="ts">
  import DocumentRedoButton from '$components/DocumentRedoButton.svelte';
  import DocumentUndoButton from '$components/DocumentUndoButton.svelte';
  import DocumentSaveButton from '$components/DocumentSaveButton.svelte';

  // undo: [ins,del,mod], [...] => [ins,del], [mod, ...]
  // redo: [ins,del], [mod, ...] => [ins,del,mod], [...]
  // save: POST(docx, [add,del,mod]) => new_docx, org_docx
  // TODO: download: if (modified) {save -> download(new_docx)} else {download(new_docx)}
  // TODO: preview: if (modified) {save -> preview(new_docx)} else {goto(/preview)}
</script>

<div>
  <DocumentUndoButton />
  <DocumentRedoButton />
  <DocumentSaveButton />
  <!-- <button><Icons type="download" /></button> -->
  <!-- <button><Icons type="preview" /></button> -->
</div>