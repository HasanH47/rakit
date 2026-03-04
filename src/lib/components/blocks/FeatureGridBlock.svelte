<script lang="ts">
    interface Feature {
        title: string;
        description: string;
        icon?: string;
    }

    const { 
        heading = "Why Choose Us", 
        subheading = "Explore the amazing features we offer.",
        features = [
            { title: "Fast Performance", description: "Blazing fast speeds powered by the edge." },
            { title: "Secure by Default", description: "Your data is safe and protected." },
            { title: "Highly Customizable", description: "Tweak every pixel to your liking." }
        ],
        columns = 3,
        bgClass = "bg-dark-50 dark:bg-dark-950"
    } = $props<{
        heading?: string;
        subheading?: string;
        features?: Feature[];
        columns?: number;
        bgClass?: string;
    }>();

    // Map column prop to tailwind grid classes
    const gridColsClass = $derived(columns === 2 ? 'md:grid-cols-2' : 
                          columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 
                          'md:grid-cols-3');
</script>

<section class={`w-full py-24 px-6 ${bgClass} transition-colors duration-300`}>
    <div class="max-w-7xl mx-auto">
        {#if heading || subheading}
        <div class="text-center mb-16">
            {#if heading}
                <h2 class="text-3xl md:text-4xl font-bold mb-4 text-dark-900 dark:text-white">{heading}</h2>
            {/if}
            {#if subheading}
                <p class="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">{subheading}</p>
            {/if}
        </div>
        {/if}

        <div class={`grid gap-8 ${gridColsClass}`}>
            {#each features as feature}
                <div class="glass-card p-8 hover:-translate-y-1 transition-transform border border-dark-200/50 dark:border-dark-800/50">
                    {#if feature.icon}
                        <div class="text-4xl mb-6">{feature.icon}</div>
                    {:else}
                        <div class="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6">
                            <span class="font-bold text-xl">✦</span>
                        </div>
                    {/if}
                    <h3 class="text-xl font-bold mb-2 text-dark-900 dark:text-white">{feature.title}</h3>
                    <p class="text-dark-600 dark:text-dark-400">{feature.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>
