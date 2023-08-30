<script lang="ts">
  import { page } from '$app/stores';
  import Icons from '$components/Icons.svelte';

  $: currentRoute = $page.url.pathname;

  let tabs = [
    { name: 'Review', path: '/review' },
    { name: 'Settings', path: '/settings' },
  ];
  let count = 0;
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost lg:hidden">
        <Icons type='menu' />
      </label>
      <ul tabindex="0" class="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {#each tabs as tab, i (tab.name)}
          <li>
            <a href={tab.path}>
              <div class:active={currentRoute === tab.path}>
              {tab.name}
            </div>
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <a class="btn btn-ghost normal-case text-xl" href='/'>DocReviewer</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      {#each tabs as tab, i (tab.name)}
        <li>
          <a href={tab.path}>
            <div class:active={currentRoute === tab.path}>
              {tab.name}
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="navbar-end">
    <button class="btn btn-ghost btn-circle">
      <Icons type='search' />
    </button>
    <button class="btn btn-ghost btn-circle">
      <div class="indicator">
        <Icons type='indicator' />
        <span class="badge badge-xs badge-primary indicator-item">{count}</span>
      </div>
    </button>
  </div>
</div>
