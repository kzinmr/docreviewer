<script lang="ts">
	import { onMount } from 'svelte';
	import { pdfDoc } from '$/store';

	export let canvasRef: HTMLCanvasElement | null;
	export let idx: number;

  let pageText: string;

	onMount(async () => {
		renderPage(idx + 1, canvasRef);
	});

	async function renderPage(pageNum: number, canvas: HTMLCanvasElement | null) {
		if (pdfDoc !== null && canvas !== null) {
			const page = await $pdfDoc.getPage(pageNum);
			const viewport = page.getViewport({ scale: 1.5 });
			canvas.height = viewport.height;
			canvas.width = viewport.width;
			const canvasContext = canvas.getContext('2d');
			if (canvasContext !== null) {
				const renderContext = {
					canvasContext: canvasContext,
					viewport
				};
				await page.render(renderContext).promise;
				const imageURL = canvas.toDataURL('image/png');
				// Read embedded text in each pages
				const content = await page.getTextContent({
					disableNormalization: true,
					includeMarkedContent: false
				});
				pageText = content.items.map((item) => ('str' in item ? item.str : '')).join('\n');
			}
		}
	}
</script>

<div class="flex flex-row">
	<canvas bind:this={canvasRef} id={`canvas-${idx}`} class="w-full h-full"/>
	<div class="flex flex-col">
		<textarea
			class="w-full h-full"
			id={`text-${idx}`}
			placeholder="Page text"
			bind:value={pageText}
		/>
	</div>
</div>

<style>
	canvas {
		width: 50%;
		height: 100%;
	}
</style>
