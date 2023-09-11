<script lang="ts">
  import PDFPageCanvas from '$components/PDFPageCanvas.svelte';
  import { pdfDoc } from '$/store';

  let canvasRefs: (HTMLCanvasElement | null)[] = [];

  $: if ($pdfDoc !== null) canvasRefs = Array($pdfDoc.numPages).fill(null);
</script>

<div class="flex flex-col mx-4">
  {#if $pdfDoc !== null}
    {#each Array($pdfDoc.numPages) as _, i}
      <PDFPageCanvas canvasRef={canvasRefs[i]} idx={i} />
    {/each}
  {/if}
</div>
