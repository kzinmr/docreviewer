<script lang="ts">
  import '$/app.css';
  import Header from '$/components/Header.svelte';
</script>

<main class="min-h-screen overflow-hidden" data-theme="lofi">
  <Header />
  <div class="min-h-screen overflow-scroll">
    <slot />
    <!-- <Footer /> -->
  </div>
</main>
