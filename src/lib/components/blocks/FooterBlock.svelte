<script lang="ts">
    const { 
        copyright = "© 2026 Rakit Powered. All rights reserved.",
        links = [
            { label: "Privacy Policy", url: "#" },
            { label: "Terms of Service", url: "#" }
        ],
        bgClass = "bg-dark-50 dark:bg-dark-950"
    } = $props<{
        copyright?: string;
        links?: Array<{label: string, url: string}>;
        bgClass?: string;
    }>();
</script>

<footer class={`w-full py-12 px-6 border-t border-dark-200/50 dark:border-dark-800/50 ${bgClass} transition-colors duration-300`}>
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="text-dark-500 dark:text-dark-400 text-sm">
            {copyright}
        </div>
        
        {#if links && links.length > 0}
            <nav class="flex gap-6 text-sm">
                {#each links as link}
                    <a href={link.url} class="text-dark-500 dark:text-dark-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                        {link.label}
                    </a>
                {/each}
            </nav>
        {/if}
    </div>
</footer>
