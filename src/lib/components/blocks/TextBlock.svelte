<script lang="ts">
	const {
		content = 'Replace this text with your own content. Rakit uses Tailwind typography for beautiful defaults.',
		align = 'text-left',
		bgClass = 'bg-white dark:bg-dark-950'
	} = $props<{
		content?: string;
		align?: string;
		bgClass?: string;
	}>();
</script>

<div class={`w-full px-6 py-16 ${bgClass} transition-colors duration-300`}>
	<div class={`prose-dark mx-auto prose max-w-4xl lg:prose-xl dark:prose-invert ${align}`}>
		<!-- Using @html is safe here if we control the input or sanitize it before saving -->
		{@html content}
	</div>
</div>
