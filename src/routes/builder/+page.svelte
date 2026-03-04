<script lang="ts">
	import Sidebar from '$lib/components/builder/Sidebar.svelte';
	import Inspector from '$lib/components/builder/Inspector.svelte';
	import Canvas from '$lib/components/builder/Canvas.svelte';
	import { canvas } from '$lib/state/canvas.svelte';

	let isPublishing = $state(false);
	let publishSuccess = $state(false);
	let publishError = $state<string | null>(null);

	async function publishWebsite() {
		// Mock username for MVP. In Epic 3 this becomes authenticated context.
		const username = "demo-user"; 
		
		if (canvas.blocks.length === 0) {
			publishError = "Cannot publish an empty canvas.";
			setTimeout(() => publishError = null, 3000);
			return;
		}

		isPublishing = true;
		publishError = null;
		publishSuccess = false;

		try {
			const res = await fetch('/api/publish', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username,
					blocks: canvas.blocks
				})
			});

			const data = (await res.json()) as { success: boolean; error?: string };

			if (data.success) {
				publishSuccess = true;
				setTimeout(() => publishSuccess = false, 3000);
			} else {
				publishError = data.error || "Unknown publishing error occurred.";
				setTimeout(() => publishError = null, 5000);
			}
		} catch (e: any) {
			publishError = e.message || "Network error occurred.";
			setTimeout(() => publishError = null, 5000);
		} finally {
			isPublishing = false;
		}
	}
</script>

<svelte:head>
	<title>Rakit Builder</title>
</svelte:head>

<div class="flex h-screen w-full flex-col overflow-hidden bg-dark-50 font-sans dark:bg-dark-950">
	<!-- Topbar -->
	<header
		class="relative z-20 flex h-14 shrink-0 items-center justify-between border-b border-dark-200 bg-white px-4 dark:border-dark-800 dark:bg-black"
	>
		<div class="flex items-center gap-3">
			<a
				href="/"
				class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg premium-gradient text-lg font-bold text-white shadow-md transition-transform hover:scale-105"
			>
				<img src="/logo.png" alt="Rakit Logo" class="h-full w-full object-cover" />
			</a>
			<div class="hidden flex-col md:flex">
				<span class="font-display text-sm leading-tight font-bold text-dark-900 dark:text-white"
					>Rakit Builder</span
				>
				<span class="text-[10px] font-medium tracking-wider text-dark-500 uppercase"
					>Unsaved Draft</span
				>
			</div>
		</div>

		<div class="flex items-center gap-2">
			
			{#if publishSuccess}
			<div class="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 animate-slide-up dark:text-emerald-400 mr-2">
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
				Published successfully
			</div>
			{/if}

			{#if publishError}
			<div class="flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-600 animate-slide-up dark:text-red-400 max-w-[200px] truncate mr-2" title={publishError}>
				<svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
				<span class="truncate">{publishError}</span>
			</div>
			{/if}

			<button
				class="rounded p-2 text-dark-500 transition-colors hover:bg-dark-100 dark:text-dark-400 dark:hover:bg-dark-900"
				title="Undo"
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
						d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
					/></svg
				>
			</button>
			<button
				class="rounded p-2 text-dark-500 transition-colors hover:bg-dark-100 dark:text-dark-400 dark:hover:bg-dark-900"
				title="Redo"
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
						d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
					/></svg
				>
			</button>

			<div class="mx-2 h-6 w-px bg-dark-200 dark:bg-dark-800"></div>

			<button
				onclick={publishWebsite}
				disabled={isPublishing}
				class={`relative overflow-hidden rounded-md px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-dark-50 dark:focus:ring-offset-dark-950 ${isPublishing ? 'bg-dark-200 cursor-wait text-dark-500 dark:bg-dark-800 dark:text-dark-400' : 'premium-gradient hover:scale-105'}`}
				title="Publish to Internet"
			>
				{#if isPublishing}
					<div class="absolute inset-0 flex items-center justify-center bg-dark-200 dark:bg-dark-800">
						<div class="h-4 w-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"></div>
					</div>
				{/if}
				<span class={isPublishing ? 'invisible' : ''}>Publish</span>
			</button>
		</div>
	</header>

	<!-- Main Workspace -->
	<div class="flex flex-1 overflow-hidden">
		<!-- Palette -->
		<Sidebar />

		<!-- Canvas Dropzone -->
		<Canvas />

		<!-- Properties -->
		<Inspector />
	</div>
</div>
