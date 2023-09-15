<script lang="ts">
  import Icons from '$components/Icons.svelte';
  import { selectedDocumentId, selectedPlaybookId, reviews } from '$/store';
  import type { ReviewSessionFull } from '$/lib/types';

  const reviewPassages = async () => {
    const playbookId = $selectedPlaybookId;
    // FIXME: paramsに移行
    const documentId = $selectedDocumentId;
    if (documentId !== null && playbookId !== null) {
      const res = await fetch('/api/review-sessions', {
        method: 'POST',
        body: JSON.stringify({ playbookId, documentId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const reviewSessionFull: ReviewSessionFull = await res.json();
      $reviews = reviewSessionFull.reviews;
      console.log('reviews: ', $reviews);
    }
  };
</script>

<button on:click={reviewPassages}><Icons type="review" /></button>
