<script lang="ts">
  import { FileDropzone } from '@skeletonlabs/skeleton';
  import { paragraphs, docxBlob, selectedDocumentId, clearAll } from '$/store';
  import JSZip from 'jszip';
  import Icons from '$/components/Icons.svelte';

  export let redirectCallback: (() => void) | null = null;

  let files: FileList;
  let message = 'Select File';

  $: if (files) message = files[0].name;

  async function onClickHandler() {
    if (files !== null) {
      clearAll();
      const file: File = Array.from(files)[0];
      $docxBlob = new Blob([file], { type: file.type });
      const content = await loadFile(file);
      $paragraphs = await parseDOCXParagraphs(content);
      $selectedDocumentId = await registerDocument($paragraphs);
    }
    // TODO: detect playbook automatically

    if (redirectCallback !== null) {
      redirectCallback();
    }
  }

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

  async function parseDOCXParagraphs(zipData: ArrayBuffer) {
    const paragraphs: string[] = [];
    const zipper = new JSZip();
    const zip = await zipper.loadAsync(zipData);

    let str = await zip.files['word/document.xml'].async('text');
    if (str.charCodeAt(0) === 65279) {
      // Ignore BOM sequence
      str = str.substring(1);
    }
    const parser = new DOMParser();
    const xml = parser.parseFromString(str, 'text/xml');
    // Parse docx content
    const paragraphsXml = xml.getElementsByTagName('w:p');
    for (const paragraphXml of paragraphsXml) {
      const textsXml = paragraphXml.getElementsByTagName('w:t');
      let fullText = '';
      for (const textXml of textsXml) {
        if (textXml.childNodes) {
          fullText += textXml.childNodes[0].nodeValue;
        }
      }
      paragraphs.push(fullText);
    }

    return paragraphs;
  }

  const registerDocument = async (lines: string[]): Promise<number | null> => {
    // TODO: docxのparagraphs と lines の暗黙の対応関係が妥当かどうかは要検討
    const resAnalyze = await fetch('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ lines }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!resAnalyze.ok) {
      return null;
    }

    const resObj: { passages: string[][] } = await resAnalyze.json();
    const passages = resObj['passages'];

    const res = await fetch('/api/document', {
      method: 'POST',
      body: JSON.stringify({ passages }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return (await res.json())['id'];
  };
</script>

<div class="flex flex-col m-10">
  <FileDropzone
    bind:files
    name="files"
    accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    slotLead="flex justify-center"
  >
    <svelte:fragment slot="lead"><Icons type="upload" /></svelte:fragment>
    <svelte:fragment slot="message">{message}</svelte:fragment>
    <svelte:fragment slot="meta">.docx allowed.</svelte:fragment>
  </FileDropzone>
  <button type="button" disabled={!files} on:click={onClickHandler} class="btn variant-filled m-4"
    >Upload</button
  >
</div>
