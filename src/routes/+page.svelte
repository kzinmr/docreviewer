<script lang="ts">
  import { goto } from '$app/navigation';
  import Header from '$/components/Header.svelte';
  import DOCXUploader from '$components/DOCXUploader.svelte';
</script>

<!-- routes/layout に配置するとdefault slotしか開けられないためHeaderだけ含める -->
<Header />
<div class="space-y-8 mt-20">
  <DOCXUploader redirectCallback={() => goto('/review?playbookId=1')} />
</div>
