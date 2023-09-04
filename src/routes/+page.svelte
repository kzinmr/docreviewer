<script lang='ts'>
  import { goto } from '$app/navigation';
  import DOCXUploader from '$components/DOCXUploader.svelte';
  import PDFUploader from '$components/PDFUploader.svelte';
</script>
<div class="space-y-8 mt-20">
  <DOCXUploader redirectCallback={() => goto('/review')} />
  <PDFUploader redirectCallback={() => goto('/preview')} />
</div>