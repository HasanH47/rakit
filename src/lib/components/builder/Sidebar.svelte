<script lang="ts">
	import { canvas } from '$lib/state/canvas.svelte';
	import type { BlockType } from '$lib/state/canvas.svelte';

	const blocks: Array<{ type: BlockType; label: string; icon: string; description: string }> = [
		{
			type: 'hero',
			label: 'Hero Section',
			icon: 'H',
			description: 'Main landing page header with a CTA.'
		},
		{
			type: 'text',
			label: 'Text Block',
			icon: 'T',
			description: 'Rich markdown or paragraph text.'
		},
		{
			type: 'feature-grid',
			label: 'Feature Grid',
			icon: 'G',
			description: 'Showcase multiple cards or values.'
		},
		{ type: 'footer', label: 'Footer', icon: 'F', description: 'Bottom navigation and copyright.' }
	];

	function handleDragStart(e: DragEvent, type: BlockType) {
		if (!e.dataTransfer) return;
		e.dataTransfer.effectAllowed = 'copy';
		e.dataTransfer.dropEffect = 'copy';
		// Transfer the block type so the canvas knows what to instantiate
		e.dataTransfer.setData('application/rakit-block', type);
	}
</script>

<aside
	class="z-10 flex h-full w-72 flex-col border-r border-dark-200 bg-white shadow-xl shadow-black/5 dark:border-dark-800 dark:bg-dark-950 dark:shadow-white/5"
>
	<div class="border-b border-dark-200 bg-dark-50 p-4 dark:border-dark-800 dark:bg-dark-900/50">
		<h2 class="text-sm font-bold tracking-widest text-dark-500 uppercase">Components</h2>
	</div>

	<div class="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
		{#each blocks as block}
			<div
				role="button"
				tabindex="0"
				draggable="true"
				ondragstart={(e) => handleDragStart(e, block.type)}
				class="group cursor-grab rounded-lg border border-dark-200 bg-dark-50 p-3 transition-all hover:border-brand-300 hover:bg-brand-50 hover:shadow-md active:cursor-grabbing dark:border-dark-800 dark:bg-dark-900 dark:hover:border-brand-700 dark:hover:bg-brand-900/30"
			>
				<div class="mb-1 flex items-center gap-3">
					<div
						class="flex h-8 w-8 items-center justify-center rounded bg-white font-bold text-brand-600 shadow-sm transition-transform group-hover:scale-110 dark:bg-dark-800 dark:text-brand-400"
					>
						{block.icon}
					</div>
					<span class="font-medium text-dark-900 dark:text-white">{block.label}</span>
				</div>
				<p class="pl-11 text-xs text-dark-500 dark:text-dark-400">{block.description}</p>
			</div>
		{/each}

		<div
			class="mt-8 glass-card rounded-xl p-4 text-center text-sm leading-relaxed text-dark-500 dark:text-dark-400"
		>
			Drag elements from this panel and drop them into the canvas.
		</div>
	</div>
</aside>
