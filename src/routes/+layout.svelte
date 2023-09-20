<script lang="ts">
  import '$/app.css';
  import { Modal, initializeStores } from '@skeletonlabs/skeleton';

  // Required only once when implementing Skeleton's Drawer, Modal, and Toast stores.
  initializeStores();
</script>

<Modal />
<slot />
