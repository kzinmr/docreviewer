<script lang="ts">
  import DocumentRedoButton from '$components/DocumentRedoButton.svelte';
  import DocumentUndoButton from '$components/DocumentUndoButton.svelte';
  import DocumentSaveButton from '$components/DocumentSaveButton.svelte';
  import DocumentReviewButton from '$components/DocumentReviewButton.svelte';

  // undo: [ins,del,mod], [...] => [ins,del], [mod, ...]
  // redo: [ins,del], [mod, ...] => [ins,del,mod], [...]
  // save: POST(org_docx, [add,del,mod]) => new_docx
  // TODO: download: if (modified) {save -> download(new_docx)} else {download(new_docx)}
  // TODO: preview: if (modified) {save -> preview(new_docx)} else {goto(/preview)}
  // review: apply review points in the selected playbook to the document
</script>

<div class="flex flex-row">
  <DocumentUndoButton />
  <DocumentRedoButton />
  <DocumentSaveButton />
  <!-- <button><Icons type="download" /></button> -->
  <!-- <button><Icons type="preview" /></button> -->
  <DocumentReviewButton />
</div>
