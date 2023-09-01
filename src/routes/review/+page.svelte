<script lang='ts'>
  import TextArea from '$components/TextAreaAutoresize.svelte'
  import { paragraphs } from '$/store';

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
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content items-start justify-start pt-4 h-screen overflow-y-auto">
    {#if !isSidebarVisible}
      <button on:click={toggleSidebar} class="btn btn-primary">Show Reviews</button>
    {/if}
    <!-- Page content here -->
    {#if $paragraphs.length > 0}
      <div class="w-2/3 p-4 border rounded">
        <div class="flex flex-col h-screen overflow-y-auto p-8 space-y-4">
          {#each $paragraphs as paragraph}
            <TextArea bind:value={paragraph} minRows={0} maxRows={40}/>  
          {/each}
        </div>
      </div>
    {/if}
  </div>
  <div bind:this={sidebar} class="flex flex-row h-screen">
    <div class="drawer-overlay {sidebarWidth} h-screen bg-base-200 text-base-content relative overflow-y-auto">
      <button on:click={toggleSidebar} class="btn btn-block" tabindex="0">Hide Reviews</button>
      <ul class="menu p-4 overflow-y-auto">
        <!-- Sidebar content here -->
        {#each Array(100) as _, n}
          <li><a href="/">Review Item {n}</a></li>
        {/each}
      </ul>
    </div>
    {#if isSidebarVisible}
      <div bind:this={resizer} on:mousedown|preventDefault={handleMousedown} class="cursor-ew-resize w-2 z-10 bg-base-300" tabindex="0" role="spinbutton"></div>
    {/if}
  </div>
</div>

<style lang="postcss">

</style>