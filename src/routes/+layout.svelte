<script lang="ts">
  import '$/app.css';
  import Header from '$/components/Header.svelte';
</script>

<main class="min-h-screen flex flex-col overflow-hidden" data-theme="lofi">
  <Header />
  <!-- 固定配置するHeader高さが約64px(4rem)なためpt-16 -->
  <div class="flex-grow overflow-scroll pt-16">
    <slot />
  </div>
</main>
