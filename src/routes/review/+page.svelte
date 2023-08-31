<script lang='ts'>
  import TextArea from '$components/TextAreaAutoresize.svelte'
  import { paragraphs } from '$/store';
</script>

<div class="drawer lg:drawer-open w-2/3">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-center justify-center">
    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Review Items</label>

    <!-- Page content here -->
    {#if $paragraphs.length > 0}
      <div class="w-2/3 p-4 border rounded">
        <div class="flex flex-col h-screen overflow-y-auto p-8 space-y-4">
          {#each $paragraphs as paragraph}
          <TextArea bind:value={paragraph} minRows={0} maxRows={40}/>  
          <!-- <textarea class="textarea h-full max-h">{paragraph}</textarea> -->
          {/each}
        </div>
      </div>
    {/if}  
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label> 
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <!-- Sidebar content here -->
      <li><a>Review Item 1</a></li>
      <li><a>Review Item 2</a></li>
    </ul>
  
  </div>
</div>

<style lang="postcss">
  .textareas-container {
    @apply w-2/3 p-4 border rounded;
    margin: auto;
    position: absolute;
    top: 10%; bottom: 0; left: 0; right: 0;
  }
</style>