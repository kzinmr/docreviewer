<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <strong class="text-xl"><a href='/'>DocReviewer</a></strong>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <a
      class="btn btn-sm !bg-transparent"
      href="/review?playbookId=1"
      rel="noreferrer"
    >
      Review
    </a>
    <a
      class="btn btn-sm !bg-transparent"
      href="/preview"
      rel="noreferrer"
    >
      Preview
    </a>
    <a
      class="btn btn-sm !bg-transparent"
      href="/settings"
      rel="noreferrer"
    >
      Settings
    </a>
  </svelte:fragment>
</AppBar>