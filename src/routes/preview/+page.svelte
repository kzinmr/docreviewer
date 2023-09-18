<script lang="ts">
  import PDFPageCanvas from '$components/PDFPageCanvas.svelte';
  import { docxBlob, pdfDoc } from '$/store';
  import * as pdfjsLib from 'pdfjs-dist';
  import type { PDFDocumentProxy } from 'pdfjs-dist';
  // ssr = false; が必要
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.js';

  let canvasRefs: (HTMLCanvasElement | null)[] = [];

  $: if ($docxBlob !== null) convertToPdf($docxBlob).then((pdf) => ($pdfDoc = pdf));
  $: if ($pdfDoc !== null) canvasRefs = Array($pdfDoc.numPages).fill(null);

  export async function convertToPdf(blobUpload: Blob): Promise<PDFDocumentProxy> {
    const formData = new FormData();
    formData.append('file', blobUpload);

    const res = await fetch('/api/docx/convert', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const blob = await res.blob();
    const content = new Uint8Array(await blob.arrayBuffer());
    return await pdfjsLib.getDocument({ data: content }).promise;
  }
</script>

<div class="flex flex-col mx-4">
  {#if $pdfDoc !== null}
    {#each Array($pdfDoc.numPages) as _, i}
      <PDFPageCanvas canvasRef={canvasRefs[i]} idx={i} />
    {/each}
  {/if}
</div>
