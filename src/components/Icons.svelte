<script lang="ts">
  import {
    Menu,
    X,
    Plus,
    Minus,
    MoreHorizontal,
    Undo,
    Redo,
    Save,
    Eye,
    Download,
    Play,
    FileCheck,
    PanelLeftClose,
    PanelLeftOpen
  } from 'lucide-svelte';
  export let type: string;
</script>

<div>
  {#if type === 'menu'}
    <Menu />
  {:else if type === 'open-left-panel'}
    <PanelLeftOpen />
  {:else if type === 'close-left-panel'}
    <PanelLeftClose />
  {:else if type === 'close'}  
    <X />
  {:else if type === 'plus'}
    <Plus />
  {:else if type === 'minus'}
    <Minus />
  {:else if type === 'edit'}
    <MoreHorizontal />
  {:else if type === 'undo'}
    <Undo />
  {:else if type === 'redo'}
    <Redo />
  {:else if type == 'save'}
    <Save />
  {:else if type == 'preview'}
    <Eye />
  {:else if type == 'download'}
    <Download />
  {:else if type === 'analyze'}
    <Play />
  {:else if type === 'review'}
    <FileCheck />
  {/if}
</div>
