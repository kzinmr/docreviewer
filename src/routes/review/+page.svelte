<script lang='ts'>
  import SidebarPage from '$components/SidebarPage.svelte'
  import TextArea from '$components/TextAreaAutoresize.svelte'
  import { paragraphs } from '$/store';
</script>

<SidebarPage>
  <div slot="sidebar-content">
    <ul class="menu p-4 overflow-y-auto">
      {#each Array(100) as _, n}
        <li><a href="/">Review Item {n}</a></li>
      {/each}
    </ul>
  </div>
  <div slot="page-content">
    {#if $paragraphs.length > 0}
      <div class="textarea-frame">
        <div class="flex flex-col h-screen overflow-y-auto p-8 space-y-4">
          {#each $paragraphs as paragraph}
            <TextArea bind:value={paragraph} minRows={0} maxRows={40}/>  
          {/each}
        </div>
      </div>
    {/if}
  </div>  
</SidebarPage>

<style lang="postcss">
  .textarea-frame {
    @apply p-4 border rounded;
  }
</style>