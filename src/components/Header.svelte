<script lang="ts">
  import { page } from '$app/stores';
  $: currentRoute = $page.url.pathname;
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href='/'>DocReviewer</a>
  </div>
  <div class="flex-none z-[1000]">
    <ul class="menu menu-horizontal px-1">
      <li>
        <details>
          <summary>
            Review
          </summary>
          <ul class="p-2 bg-base-100">
            <li><a href='/review'><div class:active={currentRoute === '/review'}>Review</div></a></li>
            <li><a href='/preview'><div class:active={currentRoute === '/preview'}>Preview</div></a></li>
          </ul>
        </details>
      </li>
      <li><a href='/settings'><div class:active={currentRoute === '/settings'}>Settings</div></a></li>
    </ul>
  </div>
</div>