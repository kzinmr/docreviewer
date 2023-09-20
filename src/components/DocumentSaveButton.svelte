<script lang="ts">
  import Icons from '$components/Icons.svelte';
  import { docxBlob, operationDequeue } from '$/store';

  const postDocx = async () => {
    if ($docxBlob) {
      const formData = new FormData();
      formData.append('file', $docxBlob);
      const operationsUpload = JSON.stringify($operationDequeue.asArray());
      formData.append('operations', operationsUpload);
      const res = await fetch('/api/docx/edit', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      $docxBlob = await res.blob();
      // TODO: split download operation into a separate component
      const link = document.createElement('a');
      link.href = URL.createObjectURL($docxBlob);
      link.download = 'converted_file.docx';
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };
</script>

<button class="btn-icon variant-filled" on:click={postDocx}><Icons type="save" /></button>
