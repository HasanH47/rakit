<script lang="ts">
	interface Feature {
		title: string;
		description: string;
		icon?: string;
	}

	const {
		heading = 'Why Choose Us',
		subheading = 'Explore the amazing features we offer.',
		features = [
			{ title: 'Fast Performance', description: 'Blazing fast speeds powered by the edge.' },
			{ title: 'Secure by Default', description: 'Your data is safe and protected.' },
			{ title: 'Highly Customizable', description: 'Tweak every pixel to your liking.' }
		],
		columns = 3,
		bgClass = 'bg-dark-50 dark:bg-dark-950'
	} = $props<{
		heading?: string;
		subheading?: string;
		features?: Feature[];
		columns?: number;
		bgClass?: string;
	}>();

	// Map column prop to tailwind grid classes
	const gridColsClass = $derived(
		columns === 2
			? 'md:grid-cols-2'
			: columns === 4
				? 'md:grid-cols-2 lg:grid-cols-4'
				: 'md:grid-cols-3'
	);
</script>

<section class={`w-full px-6 py-24 ${bgClass} transition-colors duration-300`}>
	<div class="mx-auto max-w-7xl">
		{#if heading || subheading}
			<div class="mb-16 text-center">
				{#if heading}
					<h2 class="mb-4 text-3xl font-bold text-dark-900 md:text-4xl dark:text-white">
						{heading}
					</h2>
				{/if}
				{#if subheading}
					<p class="mx-auto max-w-2xl text-dark-600 dark:text-dark-400">{subheading}</p>
				{/if}
			</div>
		{/if}

		<div class={`grid gap-8 ${gridColsClass}`}>
			{#each features as feature}
				<div
					class="glass-card border border-dark-200/50 p-8 transition-transform hover:-translate-y-1 dark:border-dark-800/50"
				>
					{#if feature.icon}
						<div class="mb-6 text-4xl">{feature.icon}</div>
					{:else}
						<div
							class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400"
						>
							<span class="text-xl font-bold">✦</span>
						</div>
					{/if}
					<h3 class="mb-2 text-xl font-bold text-dark-900 dark:text-white">{feature.title}</h3>
					<p class="text-dark-600 dark:text-dark-400">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
