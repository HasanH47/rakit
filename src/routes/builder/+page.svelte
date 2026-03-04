<script lang="ts">
    import Sidebar from '$lib/components/builder/Sidebar.svelte';
    import Inspector from '$lib/components/builder/Inspector.svelte';
    import Canvas from '$lib/components/builder/Canvas.svelte';
</script>

<svelte:head>
    <title>Rakit Builder</title>
</svelte:head>

<div class="h-screen w-full flex flex-col overflow-hidden bg-dark-50 dark:bg-dark-950 font-sans">
    
    <!-- Topbar -->
    <header class="h-14 border-b border-dark-200 dark:border-dark-800 bg-white dark:bg-black px-4 flex items-center justify-between shrink-0 z-20 relative">
        <div class="flex items-center gap-3">
            <a href="/" class="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center text-white font-bold text-lg hover:scale-105 transition-transform shadow-md">R</a>
            <div class="hidden md:flex flex-col">
                <span class="font-display font-bold text-sm leading-tight text-dark-900 dark:text-white">Rakit Builder</span>
                <span class="text-[10px] text-dark-500 font-medium tracking-wider uppercase">Unsaved Draft</span>
            </div>
        </div>
        
        <div class="flex items-center gap-2">
            <button class="p-2 rounded hover:bg-dark-100 dark:hover:bg-dark-900 text-dark-500 dark:text-dark-400 transition-colors" title="Undo">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
            </button>
            <button class="p-2 rounded hover:bg-dark-100 dark:hover:bg-dark-900 text-dark-500 dark:text-dark-400 transition-colors" title="Redo">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" /></svg>
            </button>
            
            <div class="w-px h-6 bg-dark-200 dark:bg-dark-800 mx-2"></div>
            
            <button class="bg-dark-900 hover:bg-dark-800 dark:bg-white dark:hover:bg-dark-100 text-white dark:text-dark-900 px-4 py-1.5 rounded text-sm font-medium transition-colors shadow-sm cursor-not-allowed opacity-50" title="Publish engine coming in Epic 2">
                Publish
            </button>
        </div>
    </header>

    <!-- Main Workspace -->
    <div class="flex-1 flex overflow-hidden">
        <!-- Palette -->
        <Sidebar />
        
        <!-- Canvas Dropzone -->
        <Canvas />
        
        <!-- Properties -->
        <Inspector />
    </div>

</div>
