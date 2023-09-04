<script lang='ts'>
  import * as pdfjsLib from 'pdfjs-dist';
  import { pdfDoc } from '$/store';

  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.js';
  // console.log(pdfjsLib.GlobalWorkerOptions);

  export let redirectCallback: (() => void) | null = null;
  
	let files: FileList | null = null;
	$: if (files) {
		// Reset stores when files are changed
		$pdfDoc = null;
  }

	const loadFile = async (file: File) => {
		return new Promise<{ content: ArrayBuffer, filename: string }>((resolve) => {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				if (e.target?.result !== undefined) {
					const content = e.target.result as ArrayBuffer;
  				resolve({ content: content, filename: file.name });
				}
			};
			reader.readAsArrayBuffer(file);
		});
	};

	async function loadPDF() {
		if (files !== null) {
			const file: File = Array.from(files)[0];
			const fileContent = await loadFile(file);
      const content = new Uint8Array(fileContent.content);
			$pdfDoc = await pdfjsLib.getDocument({ data: content }).promise;
		}

    if (redirectCallback !== null) {
      redirectCallback();
    }
	}
</script>

<div class="upload-container">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="file">Select .pdf File:</label>
  <div class="file-input-container">
    <input
      type="file"
      bind:files
      id="fileInput"
      class="file-input file-input-ghost w-full max-w invalid:bg-slate-50 valid:bg-slate-100"
      required
      accept="application/pdf"
    />
  </div>
  <button disabled={!files} on:click={loadPDF} class="btn btn-block">Upload PDF</button>
</div>


<style lang="postcss">
  .upload-container {
    @apply w-2/3 p-4 border rounded m-auto;
  }
  .file-input-container {
    @apply flex justify-between items-center p-1 border-dashed border-2 rounded bg-slate-50;
  }
</style>