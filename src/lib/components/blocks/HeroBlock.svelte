<script lang="ts">
	const {
		title = 'Supercharge your workflow.',
		subtitle = 'Stop wasting time on servers.',
		ctaText = 'Get Started',
		ctaLink = '#',
		bgClass = 'bg-dark-50 dark:bg-dark-950'
	} = $props<{
		title?: string;
		subtitle?: string;
		ctaText?: string;
		ctaLink?: string;
		bgClass?: string;
	}>();
</script>

<div
	class={`flex w-full flex-col items-center justify-center px-6 py-24 text-center md:py-32 ${bgClass} transition-colors duration-300`}
>
	<div class="mx-auto max-w-4xl">
		<h1
			class="mb-6 text-4xl font-extrabold tracking-tight text-dark-900 md:text-6xl dark:text-white"
		>
			{title}
		</h1>
		<p class="mx-auto mb-10 max-w-2xl text-lg text-dark-600 md:text-xl dark:text-dark-300">
			{subtitle}
		</p>
		{#if ctaText}
			<a
				href={ctaLink}
				class="inline-flex items-center justify-center rounded-lg bg-brand-500 px-8 py-3 text-lg font-medium text-white shadow-lg shadow-brand-500/30 transition-all hover:scale-105 hover:bg-brand-600 hover:shadow-brand-500/50 active:scale-95"
			>
				{ctaText}
			</a>
		{/if}
	</div>
</div>
