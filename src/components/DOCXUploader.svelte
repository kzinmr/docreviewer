<script lang='ts'>
  import JSZip from 'jszip';
  import * as pdfjsLib from 'pdfjs-dist';
  import { paragraphs, pdfDoc, orgDocxContent } from '$/store';
  import { generateUUID } from '$lib/utils/uuid';

  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.js';
  const mediatype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  // console.log(pdfjsLib.GlobalWorkerOptions);

  export let redirectCallback: (() => void) | null = null;

	let files: FileList | null = null;
	$: if (files) {
		// Reset stores when files are changed
		$paragraphs = [];
  }
  let uuidFileName: string;

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

	async function loadDOCX() {
		if (files !== null) {
			const file: File = Array.from(files)[0];
			const content = await loadFile(file);
      $orgDocxContent = content;
      $paragraphs = await parseDOCXParagraphs(content);
      // for rendering docx as pdf with pages and styles
      await convertToPdf(file);
		}

    if (redirectCallback !== null) {
      redirectCallback();
    }
	}

  async function parseDOCXParagraphs(zipData: ArrayBuffer) {
    const paragraphs: string[] = [];
    const zipper = new JSZip();
    const zip = await zipper.loadAsync(zipData);

    let str = await zip.files['word/document.xml'].async('text');
    if (str.charCodeAt(0) === 65279) {  // Ignore BOM sequence
      str = str.substring(1);
    }            
    const parser = new DOMParser();
    const xml = parser.parseFromString(str, 'text/xml');
    // Parse docx content
    const paragraphsXml = xml.getElementsByTagName("w:p");
    for (const paragraphXml of paragraphsXml) {
      const textsXml = paragraphXml.getElementsByTagName("w:t");
      let fullText = "";
      for (const textXml of textsXml ) {
        if (textXml.childNodes) {
          fullText += textXml.childNodes[0].nodeValue;
        }
      }
      paragraphs.push(fullText);
    }

    return paragraphs;
  }

  async function convertToPdf(file: File) {
    const gotenberg_domain = 'http://localhost:8080/gotenberg';

    const uuid = generateUUID();
    const fileExtension = file.name.split('.').pop();
    uuidFileName = `${uuid}.${fileExtension}`;
    const blobUpload = new Blob([file], { type: file.type });

    const formData = new FormData();
    formData.append('file', blobUpload, uuidFileName);

    try {
      const response = await fetch(`${gotenberg_domain}/forms/libreoffice/convert`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const content = new Uint8Array(await blob.arrayBuffer());
			$pdfDoc = await pdfjsLib.getDocument({ data: content }).promise;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
</script>

<div class="upload-container">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="file">Select .docx File:</label>
  <div class="file-input-container">
    <input
      type="file"
      bind:files
      id="fileInput"
      class="file-input file-input-ghost w-full max-w invalid:bg-slate-50 valid:bg-slate-100"
      required
      accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    />
  </div>
  <button disabled={!files} on:click={loadDOCX} class="btn btn-block">upload</button>
</div>

<style lang="postcss">
  .upload-container {
    @apply w-2/3 p-4 border rounded m-auto;
  }
  .file-input-container {
    @apply flex justify-between items-center p-1 border-dashed border-2 rounded bg-slate-50;
  }
</style>