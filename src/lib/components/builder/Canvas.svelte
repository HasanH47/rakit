<script lang="ts">
	import { canvas } from '$lib/state/canvas.svelte';
	import type { BlockType } from '$lib/state/canvas.svelte';
	import HeroBlock from '../blocks/HeroBlock.svelte';
	import TextBlock from '../blocks/TextBlock.svelte';
	import FeatureGridBlock from '../blocks/FeatureGridBlock.svelte';
	import FooterBlock from '../blocks/FooterBlock.svelte';
	import { fade } from 'svelte/transition';

	function resolveComponent(type: BlockType) {
		switch (type) {
			case 'hero':
				return HeroBlock;
			case 'text':
				return TextBlock;
			case 'feature-grid':
				return FeatureGridBlock;
			case 'footer':
				return FooterBlock;
			default:
				return null;
		}
	}

	let isDragOver = $state(false);

	function handleDragOver(e: DragEvent) {
		e.preventDefault(); // Necessary to allow dropping
		// Only allow dropping our custom "rakit-block" data
		if (e.dataTransfer?.types.includes('application/rakit-block')) {
			e.dataTransfer.dropEffect = 'copy';
			isDragOver = true;
		}
	}

	function handleDragLeave(e: DragEvent) {
		isDragOver = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragOver = false;

		const blockType = e.dataTransfer?.getData('application/rakit-block') as BlockType;
		if (!blockType) return;

		// Setup initial default properties based on type (simpler version of what could be a complex schema)
		const defaultProps: Record<string, any> = {};
		if (blockType === 'hero') {
			defaultProps.title = 'Your Epic Title';
			defaultProps.subtitle = 'Replace this subtitle.';
			defaultProps.ctaText = 'Click Here';
			defaultProps.ctaLink = '#';
		} else if (blockType === 'text') {
			defaultProps.content =
				'<h2>Rich Text Area</h2><p>You can edit this HTML right in the inspector.</p>';
			defaultProps.align = 'text-center';
		} else if (blockType === 'feature-grid') {
			defaultProps.heading = 'Our Features';
			defaultProps.subheading = 'What makes us different';
			defaultProps.columns = 3;
			defaultProps.features = [
				{ title: 'Point One', description: 'Details...' },
				{ title: 'Point Two', description: 'Details...' },
				{ title: 'Point Three', description: 'Details...' }
			];
		} else if (blockType === 'footer') {
			defaultProps.copyright = '© 2026 Your Name.';
		}

		// In a real implementation we'd calculate the drop index based on mouse position.
		// For now, simply append to the end.
		canvas.addBlock(blockType, undefined, defaultProps);
	}
</script>

<main class="relative flex flex-1 flex-col items-center overflow-y-auto bg-dark-100 dark:bg-black">
	<!-- Top toolbar area placeholder -->
	<div
		class="sticky top-0 z-20 flex w-full justify-center border-b border-dark-300 bg-dark-200/50 p-2 text-xs font-medium text-dark-500 backdrop-blur dark:border-dark-800 dark:bg-dark-900/50"
	>
		Desktop View • 100%
	</div>

	<!-- The actual canvas document -->
	<div
		class={`min-h-[calc(100vh-4rem)] w-full max-w-[1200px] bg-white shadow-2xl transition-all duration-300 dark:bg-dark-950 ${isDragOver ? 'ring-4 ring-brand-500/50' : ''}`}
		ondragover={handleDragOver}
		ondragleave={handleDragLeave}
		ondrop={handleDrop}
		role="region"
		aria-label="Website Builder Canvas"
	>
		{#if canvas.blocks.length === 0}
			<div class="flex h-[600px] flex-col items-center justify-center text-dark-400">
				<div
					class="mb-6 rounded-full border-2 border-dashed border-dark-300 bg-dark-50 p-8 transition-colors group-hover:bg-brand-50 dark:border-dark-700 dark:bg-dark-900"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-16 w-16 text-dark-300 dark:text-dark-700"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M12 4v16m8-8H4"
						/></svg
					>
				</div>
				<h2 class="mb-2 text-2xl font-bold text-dark-500 dark:text-dark-300">Canvas Empty</h2>
				<p>Drag components from the sidebar to start building.</p>
			</div>
		{:else}
			<div class="relative flex w-full flex-col">
				{#each canvas.blocks as block (block.id)}
					{@const Component = resolveComponent(block.type)}
					{#if Component}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="group relative outline-none"
							onclick={() => canvas.selectBlock(block.id)}
							transition:fade={{ duration: 200 }}
						>
							<div
								class={`pointer-events-none absolute inset-0 z-10 border-2 transition-colors ${canvas.selectedBlockId === block.id ? 'border-brand-500 shadow-[0_0_0_4px_rgba(20,184,166,0.1)]' : 'border-transparent group-hover:border-brand-500/50'}`}
							></div>

							<!-- Block Controller Overlay (visible on hover/select) -->
							{#if canvas.selectedBlockId === block.id}
								<div
									class="absolute -top-3 right-4 z-20 flex overflow-hidden rounded bg-brand-500 text-xs font-bold text-white shadow-lg"
									transition:fade={{ duration: 100 }}
								>
									<span class="bg-brand-600 px-2 py-1">{block.type.toUpperCase()}</span>
									<button
										aria-label="Remove block"
										class="px-2 py-1 transition-colors hover:bg-red-500"
										onclick={(e) => {
											e.stopPropagation();
											canvas.removeBlock(block.id);
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/></svg
										>
									</button>
								</div>
							{/if}

							<Component {...block.properties} />
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</main>
