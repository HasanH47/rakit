<script lang="ts">
    const { 
        content = "Replace this text with your own content. Rakit uses Tailwind typography for beautiful defaults.",
        align = "text-left",
        bgClass = "bg-white dark:bg-dark-950"
    } = $props<{
        content?: string;
        align?: string;
        bgClass?: string;
    }>();
</script>

<div class={`w-full py-16 px-6 ${bgClass} transition-colors duration-300`}>
    <div class={`max-w-4xl mx-auto prose prose-dark dark:prose-invert lg:prose-xl ${align}`}>
        <!-- Using @html is safe here if we control the input or sanitize it before saving -->
        {@html content}
    </div>
</div>
