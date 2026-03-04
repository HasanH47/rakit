<script lang="ts">
  import { fade, fly } from 'svelte/transition';
</script>

<svelte:head>
  <title>Rakit - $0 Serverless Web Builder</title>
  <meta name="description" content="Build and deploy beautiful static websites for free using GitHub and Cloudflare Pages." />
</svelte:head>

<div class="min-h-screen grid grid-rows-[auto_1fr_auto] overflow-hidden">
  
  <!-- Header / Nav -->
  <header class="w-full fixed top-0 z-50 glass border-b border-dark-200/50 dark:border-dark-800/50">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center text-white font-bold text-xl">R</div>
        <span class="font-display font-bold text-xl tracking-tight">Rakit</span>
      </div>
      <nav class="hidden md:flex gap-8 text-sm font-medium text-dark-600 dark:text-dark-300">
        <a href="#features" class="hover:text-brand-500 transition-colors">Features</a>
        <a href="#how-it-works" class="hover:text-brand-500 transition-colors">How it Works</a>
        <a href="https://github.com/hasanh47/rakit" target="_blank" rel="noopener noreferrer" class="hover:text-brand-500 transition-colors">GitHub</a>
      </nav>
      <div>
        <a href="/builder" class="bg-dark-900 hover:bg-dark-800 dark:bg-white dark:hover:bg-dark-100 text-white dark:text-dark-900 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 hover:shadow-lg active:scale-95">
          Open Builder
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="w-full pt-16">
    <!-- Decorative background elements -->
    <div class="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10">
      <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-400/20 dark:bg-brand-500/10 blur-[100px]"></div>
      <div class="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-400/20 dark:bg-blue-500/10 blur-[100px]"></div>
    </div>

    <section class="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-brand-200 dark:border-brand-800/30 text-sm font-medium text-brand-600 dark:text-brand-400 mb-8 animate-fade-in" style="animation-delay: 100ms; animation-fill-mode: both;">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
        </span>
        100% Free Open-Source Architecture
      </div>
      
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight animate-fade-in" style="animation-delay: 200ms; animation-fill-mode: both;">
        Build Beautiful Websites <br />
        <span class="premium-gradient-text">Without the Server Bills.</span>
      </h1>
      
      <p class="text-lg md:text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto mb-12 animate-fade-in" style="animation-delay: 300ms; animation-fill-mode: both;">
        Rakit is a blazing fast visual web builder that stores your data in GitHub and serves your site via Cloudflare Edge. Zero databases. Zero hosting fees. Total freedom.
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style="animation-delay: 400ms; animation-fill-mode: both;">
        <a href="/builder" class="premium-gradient text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
          Start Building Free
        </a>
        <a href="https://github.com/hasanh47/rakit" target="_blank" rel="noopener noreferrer" class="glass-card px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/50 dark:hover:bg-dark-800/50 transition-all active:scale-95 w-full sm:w-auto flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Star on GitHub
        </a>
      </div>
    </section>

    <!-- Preview Mockup Image/Div -->
    <section class="max-w-6xl mx-auto px-6 pb-32 animate-slide-up" style="animation-delay: 500ms; animation-fill-mode: both;">
      <div class="relative rounded-2xl md:rounded-[2rem] p-2 md:p-4 premium-gradient shadow-2xl shadow-brand-500/20">
        <div class="bg-dark-50 dark:bg-dark-950 rounded-xl md:rounded-2xl overflow-hidden border border-white/20 dark:border-dark-700/50 aspect-video relative flex items-center justify-center">
            <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(var(--color-brand-500) 1px, transparent 1px); background-size: 20px 20px;"></div>
            <!-- Mock UI Elements -->
            <div class="relative z-10 w-3/4 h-3/4 glass-card border flex overflow-hidden">
                <div class="w-1/4 border-r border-dark-200/50 dark:border-dark-800/50 p-4 flex flex-col gap-2">
                    <div class="h-4 w-1/2 bg-dark-200 dark:bg-dark-800 rounded mb-4"></div>
                    <div class="h-10 rounded bg-dark-100 dark:bg-dark-900 border border-dark-200 dark:border-dark-800"></div>
                    <div class="h-10 rounded bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex flex-center px-4 py-2 font-medium text-xs">Hero Block</div>
                    <div class="h-10 rounded bg-dark-100 dark:bg-dark-900 border border-dark-200 dark:border-dark-800"></div>
                </div>
                <div class="w-3/4 p-8 flex flex-col items-center justify-center gap-4">
                    <div class="h-8 w-3/4 rounded-full bg-dark-800 dark:bg-white/90"></div>
                    <div class="h-4 w-1/2 rounded-full bg-dark-300 dark:bg-dark-600"></div>
                    <div class="h-10 w-32 rounded-lg premium-gradient mt-4"></div>
                </div>
            </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-24 bg-white/50 dark:bg-dark-950/50 border-y border-dark-200/50 dark:border-dark-800/50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Architected for $0 Operations</h2>
          <p class="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">We ripped out the expensive parts of traditional web platforms and replaced them with raw edge performance.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="glass-card p-8 hover:-translate-y-1 transition-transform">
            <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">GitHub as a Database</h3>
            <p class="text-dark-600 dark:text-dark-400">Your site data is stored as raw HTML files directly in a GitHub repository via REST API. No SQL, no MongoDB, no bills.</p>
          </div>
          
          <div class="glass-card p-8 hover:-translate-y-1 transition-transform">
            <div class="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Cloudflare Edge Proxy</h3>
            <p class="text-dark-600 dark:text-dark-400">Visitors don't wait. SvelteKit intercepts requests and serves your cached GitHub files from the nearest Cloudflare Edge node globally.</p>
          </div>
          
          <div class="glass-card p-8 hover:-translate-y-1 transition-transform">
            <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Visual Svelte Engine</h3>
            <p class="text-dark-600 dark:text-dark-400">Drag and drop components in real-time. The powerful Svelte engine compiles your visual design into pure static HTML on publish.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-32 relative overflow-hidden">
        <div class="absolute inset-0 premium-gradient opacity-10"></div>
        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">Ready to break free?</h2>
            <p class="text-xl text-dark-600 dark:text-dark-300 mb-10">Join the open-source movement of zero-cost web hosting and intuitive design.</p>
            <a href="/builder" class="inline-flex items-center gap-2 bg-dark-900 dark:bg-white text-white dark:text-dark-900 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
                Launch Rakit Builder
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
        </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="border-t border-dark-200/50 dark:border-dark-800/50 py-12 text-center text-sm text-dark-500">
    <p>Open Source &middot; Built with SvelteKit & Tailwind CSS</p>
  </footer>

</div>

<style>
  /* Ensure smooth scrolling for anchor links */
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
