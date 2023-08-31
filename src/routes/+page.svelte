<script lang='ts'>
  import { goto } from '$app/navigation';
  import DOCXUploader from '$components/DOCXUploader.svelte';
</script>

<DOCXUploader redirectCallback={() => goto('/review')} />
