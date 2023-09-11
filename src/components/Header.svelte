<script lang="ts">
  import { page } from '$app/stores';
  $: currentRoute = $page.url.pathname;
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/">DocReviewer</a>
  </div>
  <div class="flex-none z-[1000]">
    <ul class="menu menu-horizontal px-1">
      <li>
        <a href="/review?playbookId=1">
          <div class:active={currentRoute === '/review?playbookId=1'}>Review</div>
        </a>
      </li>
      <li>
        <a href="/preview">
          <div class:active={currentRoute === '/preview'}>Preview</div>
        </a>
      </li>
      <li>
        <a href="/settings">
          <div class:active={currentRoute === '/settings'}>Settings</div>
        </a>
      </li>
    </ul>
  </div>
</div>
