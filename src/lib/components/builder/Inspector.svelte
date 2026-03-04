<script lang="ts">
    import { canvas } from '$lib/state/canvas.svelte';
    
    // Quick helper to categorize input types based on key name conventions
    function getInputType(key: string): 'text' | 'color' | 'textarea' | 'number' {
        if (key.includes('Color') || key.includes('bg')) return 'text'; // Keep as text for tailwind classes if needed, or real color picker
        if (key.includes('description') || key.includes('content')) return 'textarea';
        if (key.includes('columns') || key.includes('Size')) return 'number';
        return 'text';
    }
</script>

<aside class="w-80 bg-white dark:bg-dark-950 border-l border-dark-200 dark:border-dark-800 flex flex-col h-full z-10 shadow-xl shadow-black/5 dark:shadow-white/5">
    <div class="p-4 border-b border-dark-200 dark:border-dark-800 bg-dark-50 dark:bg-dark-900/50 flex justify-between items-center">
        <h2 class="font-bold text-sm tracking-widest text-dark-500 uppercase">Inspector</h2>
        {#if canvas.selectedBlockId}
            <span class="text-xs bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 px-2 py-1 rounded">Active</span>
        {/if}
    </div>
    
    <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        {#if canvas.selectedBlock}
            {@const block = canvas.selectedBlock}
            
            <div class="mb-2">
                <h3 class="font-bold text-lg text-dark-900 dark:text-white capitalize">{block.type.replace('-', ' ')} Settings</h3>
                <p class="text-xs text-dark-500">ID: {block.id.split('-')[1]}</p>
            </div>

            <div class="space-y-4">
                {#each Object.entries(block.properties) as [key, value]}
                    {@const type = getInputType(key)}
                    
                    <div class="flex flex-col gap-1.5">
                        <label for={`prop-${key}`} class="text-xs font-semibold text-dark-700 dark:text-dark-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        
                        {#if typeof value === 'object' && Array.isArray(value)}
                            <!-- Basic Array inspector (e.g., Features or Links) -->
                            <div class="text-xs text-brand-500 p-2 border border-brand-200 dark:border-brand-800/50 bg-brand-50 dark:bg-brand-900/10 rounded">
                                Array properties ({value.length} items) are complex to edit inline. In a production build, this would be a nested list editor.
                            </div>
                        {:else if type === 'textarea'}
                            <textarea 
                                id={`prop-${key}`}
                                rows="4"
                                class="w-full text-sm rounded bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800 text-dark-900 dark:text-white p-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-sans"
                                value={String(value)}
                                oninput={(e) => canvas.updateBlockProperty(block.id, key, e.currentTarget.value)}
                            ></textarea>
                        {:else}
                            <input 
                                id={`prop-${key}`}
                                type={type}
                                class="w-full text-sm rounded bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800 text-dark-900 dark:text-white p-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-sans"
                                value={String(value)}
                                oninput={(e) => {
                                    const val = type === 'number' ? Number(e.currentTarget.value) : e.currentTarget.value;
                                    canvas.updateBlockProperty(block.id, key, val);
                                }}
                            />
                        {/if}
                    </div>
                {/each}
            </div>
            
            <div class="mt-8 pt-6 border-t border-red-200 dark:border-red-900/30">
                <button 
                    onclick={() => canvas.removeBlock(block.id)}
                    class="w-full py-2 px-4 rounded border border-red-500 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                    Delete Block
                </button>
            </div>
            
        {:else}
            <div class="h-full flex flex-col items-center justify-center text-center text-dark-400 p-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                <p class="text-sm">Select a block on the canvas to edit its properties.</p>
            </div>
        {/if}
    </div>
</aside>
