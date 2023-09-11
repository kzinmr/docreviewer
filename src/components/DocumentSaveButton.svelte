<script lang="ts">
  import Icons from '$components/Icons.svelte';
  import { orgDocxContent, newDocxContent, operationDequeue } from '$/store';
  const mediatype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  const postDocx = async () => {
    if ($orgDocxContent) {
      const formData = new FormData();
      const blobUpload = new Blob([$orgDocxContent], { type: mediatype });
      formData.append('file', blobUpload);
      const operationsUpload = JSON.stringify($operationDequeue.asArray());
      formData.append('operations', operationsUpload);
      const res = await fetch('/api/docx/edit', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await res.blob();
      $newDocxContent = await blob.arrayBuffer();
      // TODO: split download operation into a separate component
      const _blob = new Blob([$newDocxContent], { type: mediatype });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(_blob);
      link.download = 'converted_file.docx';
      link.click();
      URL.revokeObjectURL(link.href);
      $orgDocxContent = $newDocxContent;
    }
  };
</script>

<button on:click={postDocx}><Icons type="save" /></button>
