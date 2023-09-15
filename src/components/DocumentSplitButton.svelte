<script lang="ts">
  import Icons from '$components/Icons.svelte';
  import { paragraphs, selectedDocumentId } from '$/store';

  const analyzeParagraphs = async () => {
    if ($paragraphs.length > 0) {
      // TODO: paragraphs -> lines の暗黙の対応関係が妥当かどうかは要検討
      const resAnalyze = await fetch('/api/analyze', {
        method: 'POST',
        body: JSON.stringify({ lines: $paragraphs }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!resAnalyze.ok) {
        throw new Error('Network response was not ok');
      }

      const resObj: { passages: string[][] } = await resAnalyze.json();
      const passages = resObj['passages'];

      const res = await fetch('/api/document', {
        method: 'POST',
        body: JSON.stringify({ passages: passages }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      $selectedDocumentId = (await res.json())['id'];
    }
  };
</script>

<button on:click={analyzeParagraphs}><Icons type="analyze" /></button>
