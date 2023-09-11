<script lang="ts">
  let sidebarWidth = 'w-full';
  let sidebar: HTMLDivElement;
  let resizer: HTMLDivElement;
  let isSidebarVisible = true;
  let startX: number;
  let startWidth: number;

  const handleMousedown = (e: MouseEvent) => {
    startX = e.pageX;
    startWidth = sidebar.offsetWidth;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const newWidth = startWidth + (e.pageX - startX);
    sidebar.style.width = `${newWidth}px`;
  };

  function toggleSidebar() {
    isSidebarVisible = !isSidebarVisible;
    sidebar.classList.toggle('hidden');
  }
</script>

<div class="drawer relative">
  <div class="drawer-content items-start justify-start pt-4 h-screen overflow-y-auto">
    {#if !isSidebarVisible}
      <button on:click={toggleSidebar} class="btn btn-primary absolute top-0 z-10">{'>>'}</button>
    {/if}
    <!-- Page content here -->
    <slot name="page-content" />
  </div>
  <div bind:this={sidebar} class="sidebar-container">
    {#if isSidebarVisible}
      <div
        class="drawer-overlay {sidebarWidth} h-screen bg-base-200 text-base-content relative overflow-y-auto"
      >
        <button on:click={toggleSidebar} class="btn btn-square" tabindex="0">{'<<'}</button>
        <!-- Sidebar content here -->
        <slot name="sidebar-content" />
      </div>
      <div
        bind:this={resizer}
        on:mousedown|preventDefault={handleMousedown}
        class="cursor-ew-resize w-2 z-10 bg-base-300"
        tabindex="0"
        role="spinbutton"
      ></div>
    {/if}
  </div>
</div>

<style lang="postcss">
  .sidebar-container {
    @apply flex flex-row h-screen;
  }
</style>
