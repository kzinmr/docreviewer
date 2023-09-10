<script lang="ts">
  import { readableStreamToArrayBuffer } from '$lib/utils/convert';

  let files: FileList;
  const mediatype: string =
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const loadFile = async (file: File) => {
    return new Promise<ArrayBuffer>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result !== undefined) {
          const content = e.target.result as ArrayBuffer;
          resolve(content);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };
  function convertToBase64AndDownload(content: ArrayBuffer) {
    // See. https://ja.javascript.info/blob
    const blob = new Blob([content], { type: mediatype });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'converted_file.docx';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function loadDOCX() {
    if (files !== null) {
      const file: File = Array.from(files)[0];
      const content = await loadFile(file);

      const res = await fetch('/api/docx/edit', {
        method: 'POST',
        body: content,
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      });

      if (res.body) {
        const wcontent = await readableStreamToArrayBuffer(res.body);
        convertToBase64AndDownload(wcontent);
      }
    }
  }
</script>

<div class="upload-container">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="file">Select .docx File:</label>
  <form method="post" enctype="multipart/form-data" on:submit|preventDefault={loadDOCX}>
    <div class="file-input-container">
      <input
        type="file"
        bind:files
        name="file"
        id="fileInput"
        class="file-input file-input-ghost w-full max-w invalid:bg-slate-50 valid:bg-slate-100"
        required
        accept={mediatype}
      />
    </div>
    <button disabled={!files} type="submit" class="btn btn-block">upload & convert</button>
  </form>
</div>
