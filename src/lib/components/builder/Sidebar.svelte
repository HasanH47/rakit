<script lang="ts">
    import { canvas } from '$lib/state/canvas.svelte';
    import type { BlockType } from '$lib/state/canvas.svelte';

    const blocks: Array<{ type: BlockType, label: string, icon: string, description: string }> = [
        { type: 'hero', label: 'Hero Section', icon: 'H', description: 'Main landing page header with a CTA.' },
        { type: 'text', label: 'Text Block', icon: 'T', description: 'Rich markdown or paragraph text.' },
        { type: 'feature-grid', label: 'Feature Grid', icon: 'G', description: 'Showcase multiple cards or values.' },
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

<aside class="w-72 bg-white dark:bg-dark-950 border-r border-dark-200 dark:border-dark-800 flex flex-col h-full z-10 shadow-xl shadow-black/5 dark:shadow-white/5">
    <div class="p-4 border-b border-dark-200 dark:border-dark-800 bg-dark-50 dark:bg-dark-900/50">
        <h2 class="font-bold text-sm tracking-widest text-dark-500 uppercase">Components</h2>
    </div>
    
    <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {#each blocks as block}
            <div 
                role="button"
                tabindex="0"
                draggable="true" 
                ondragstart={(e) => handleDragStart(e, block.type)}
                class="group p-3 rounded-lg border border-dark-200 dark:border-dark-800 bg-dark-50 dark:bg-dark-900 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:border-brand-300 dark:hover:border-brand-700 cursor-grab active:cursor-grabbing transition-all hover:shadow-md"
            >
                <div class="flex items-center gap-3 mb-1">
                    <div class="w-8 h-8 rounded bg-white dark:bg-dark-800 flex items-center justify-center font-bold text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform shadow-sm">
                        {block.icon}
                    </div>
                    <span class="font-medium text-dark-900 dark:text-white">{block.label}</span>
                </div>
                <p class="text-xs text-dark-500 dark:text-dark-400 pl-11">{block.description}</p>
            </div>
        {/each}
        
        <div class="mt-8 p-4 rounded-xl glass-card text-center text-sm text-dark-500 dark:text-dark-400 leading-relaxed">
            Drag elements from this panel and drop them into the canvas.
        </div>
    </div>
</aside>
