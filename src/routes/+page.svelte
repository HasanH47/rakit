<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Hero Animations
		const tl = gsap.timeline();
		tl.fromTo('.hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
		  .fromTo('.hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
		  .fromTo('.hero-desc', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
		  .fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.1 }, '-=0.4');

		// Decorative Orbs
		gsap.to('.orb-1', { y: 'random(-50, 50)', x: 'random(-50, 50)', duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
		gsap.to('.orb-2', { y: 'random(-50, 50)', x: 'random(-50, 50)', duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });

		// Mockup Parallax
		gsap.fromTo('.hero-mockup', 
			{ y: 100, opacity: 0, rotationX: 10 },
			{ y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.hero-mockup', start: 'top 85%' } }
		);

		// Features Stagger
		gsap.fromTo('.feature-card', 
			{ y: 50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out', scrollTrigger: { trigger: '#features', start: 'top 75%' } }
		);

		// Use Cases Showcases
		gsap.fromTo('.use-case-card',
			{ y: 50, opacity: 0, scale: 0.95 },
			{ y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out', scrollTrigger: { trigger: '.use-cases-section', start: 'top 75%' } }
		);

		// CTA Section
		gsap.fromTo('.cta-content', 
			{ scale: 0.9, opacity: 0 },
			{ scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.cta-section', start: 'top 80%' } }
		);
	});
</script>

<svelte:head>
	<title>Rakit - $0 Serverless Web Builder</title>
	<meta
		name="description"
		content="Build and deploy beautiful static websites for free using GitHub and Cloudflare Pages."
	/>
</svelte:head>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto] overflow-hidden">
	<!-- Header / Nav -->
	<header class="fixed top-0 z-50 w-full glass border-b border-dark-200/50 dark:border-dark-800/50">
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
			<div class="flex items-center gap-2">
				<div
					class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg premium-gradient text-xl font-bold text-white"
				>
					<img src="/logo.png" alt="Rakit Logo" class="h-full w-full object-cover" />
				</div>
				<span class="font-display text-xl font-bold tracking-tight">Rakit</span>
			</div>
			<nav class="hidden gap-8 text-sm font-medium text-dark-600 md:flex dark:text-dark-300">
				<a href="#features" class="transition-colors hover:text-brand-500">Features</a>
				<a href="#how-it-works" class="transition-colors hover:text-brand-500">How it Works</a>
				<a
					href="https://github.com/hasanh47/rakit"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors hover:text-brand-500">GitHub</a
				>
			</nav>
			<div>
				<a
					href="/builder"
					class="rounded-lg bg-dark-900 px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-dark-800 hover:shadow-lg active:scale-95 dark:bg-white dark:text-dark-900 dark:hover:bg-dark-100"
				>
					Open Builder
				</a>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<main class="w-full pt-16">
		<!-- Decorative background elements -->
		<div class="absolute top-0 left-0 -z-10 h-[600px] w-full overflow-hidden">
			<div
				class="orb-1 absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-brand-400/20 blur-[100px] dark:bg-brand-500/10"
			></div>
			<div
				class="orb-2 absolute top-[20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-[100px] dark:bg-blue-500/10"
			></div>
		</div>

		<section class="mx-auto max-w-7xl px-6 pt-32 pb-24 text-center">
			<div
				class="hero-badge opacity-0 mb-8 inline-flex items-center gap-2 glass-card rounded-full border border-brand-200 px-3 py-1 text-sm font-medium text-brand-600 dark:border-brand-800/30 dark:text-brand-400"
			>
				<span class="relative flex h-2 w-2">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75"
					></span>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-brand-500"></span>
				</span>
				100% Free Open-Source Architecture
			</div>

			<h1
				class="hero-title opacity-0 mb-8 text-5xl leading-tight font-extrabold tracking-tight md:text-7xl"
			>
				Build Beautiful Websites <br />
				<span class="premium-gradient-text">Without the Server Bills.</span>
			</h1>

			<p
				class="hero-desc opacity-0 mx-auto mb-12 max-w-2xl text-lg text-dark-600 md:text-xl dark:text-dark-300"
			>
				Rakit is a blazing fast visual web builder that stores your data in GitHub and serves your
				site via Cloudflare Edge. Zero databases. Zero hosting fees. Total freedom.
			</p>

			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/builder"
					class="hero-cta opacity-0 w-full rounded-xl premium-gradient px-8 py-4 text-lg font-bold text-white shadow-xl shadow-brand-500/20 transition-all hover:scale-105 hover:shadow-brand-500/40 active:scale-95 sm:w-auto"
				>
					Start Building Free
				</a>
				<a
					href="https://github.com/hasanh47/rakit"
					target="_blank"
					rel="noopener noreferrer"
					class="hero-cta opacity-0 flex w-full items-center justify-center gap-2 glass-card rounded-xl px-8 py-4 text-lg font-bold transition-all hover:bg-white/50 active:scale-95 sm:w-auto dark:hover:bg-dark-800/50"
				>
					<svg viewBox="0 0 24 24" class="h-6 w-6 fill-current"
						><path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/></svg
					>
					Star on GitHub
				</a>
			</div>
		</section>

		<!-- Preview Mockup Image/Div -->
		<section class="max-w-6xl mx-auto px-6 pb-24 hero-mockup opacity-0" style="transform-style: preserve-3d; perspective: 1000px;">
			<div
				class="relative rounded-2xl premium-gradient p-2 shadow-2xl shadow-brand-500/20 md:rounded-[2rem] md:p-4"
			>
				<div
					class="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-dark-50 md:rounded-2xl dark:border-dark-700/50 dark:bg-dark-950"
				>
					<div
						class="absolute inset-0 opacity-10"
						style="background-image: radial-gradient(var(--color-brand-500) 1px, transparent 1px); background-size: 20px 20px;"
					></div>
					<!-- Mock UI Elements -->
					<div class="relative z-10 flex h-3/4 w-3/4 overflow-hidden glass-card border">
						<div
							class="flex w-1/4 flex-col gap-2 border-r border-dark-200/50 p-4 dark:border-dark-800/50"
						>
							<div class="mb-4 h-4 w-1/2 rounded bg-dark-200 dark:bg-dark-800"></div>
							<div
								class="h-10 rounded border border-dark-200 bg-dark-100 dark:border-dark-800 dark:bg-dark-900"
							></div>
							<div
								class="flex-center flex h-10 rounded border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-medium text-brand-600 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-400"
							>
								Hero Block
							</div>
							<div
								class="h-10 rounded border border-dark-200 bg-dark-100 dark:border-dark-800 dark:bg-dark-900"
							></div>
						</div>
						<div class="flex w-3/4 flex-col items-center justify-center gap-4 p-8">
							<div class="h-8 w-3/4 rounded-full bg-dark-800 dark:bg-white/90"></div>
							<div class="h-4 w-1/2 rounded-full bg-dark-300 dark:bg-dark-600"></div>
							<div class="mt-4 h-10 w-32 rounded-lg premium-gradient"></div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Showcase & Use Cases -->
		<section class="use-cases-section mx-auto max-w-7xl px-6 pb-24">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-3xl font-bold md:text-4xl text-dark-900 dark:text-white">Empowering Every Creator</h2>
				<p class="mx-auto max-w-2xl text-dark-600 dark:text-dark-400">
					Rakit’s headless engine morphs natively accommodating diverse professional workflows and dynamic web projects flawlessly.
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
				<div class="use-case-card opacity-0 group relative overflow-hidden rounded-2xl border border-dark-200/50 bg-white/50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:bg-white dark:border-dark-800/50 dark:bg-dark-950/50 dark:hover:bg-dark-900">
					<div class="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div>
					<h3 class="mb-2 text-xl font-bold text-dark-900 dark:text-white">Startups & SaaS</h3>
					<p class="text-dark-600 dark:text-dark-400">Launch premium feature matrixes and convert raw visitors instantly directly utilizing integrated Edge nodes.</p>
				</div>
				<div class="use-case-card opacity-0 group relative overflow-hidden rounded-2xl border border-dark-200/50 bg-white/50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:bg-white dark:border-dark-800/50 dark:bg-dark-950/50 dark:hover:bg-dark-900">
					<div class="absolute inset-0 bg-linear-to-br from-brand-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>
					<h3 class="mb-2 text-xl font-bold text-dark-900 dark:text-white">Portfolios</h3>
					<p class="text-dark-600 dark:text-dark-400">Visually execute pristine image galleries defining absolute minimal modern UI typography seamlessly.</p>
				</div>
				<div class="use-case-card opacity-0 group relative overflow-hidden rounded-2xl border border-dark-200/50 bg-white/50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:bg-white dark:border-dark-800/50 dark:bg-dark-950/50 dark:hover:bg-dark-900">
					<div class="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></div>
					<h3 class="mb-2 text-xl font-bold text-dark-900 dark:text-white">Digital Creators</h3>
					<p class="text-dark-600 dark:text-dark-400">Compose textual stories freely without database setups or infrastructure management whatsoever.</p>
				</div>
			</div>
		</section>

		<!-- Features -->
		<section
			id="features"
			class="border-y border-dark-200/50 bg-white/50 py-24 dark:border-dark-800/50 dark:bg-dark-950/50"
		>
			<div class="mx-auto max-w-7xl px-6">
				<div class="mb-16 text-center">
					<h2 class="mb-4 text-3xl font-bold md:text-4xl">Architected for $0 Operations</h2>
					<p class="mx-auto max-w-2xl text-dark-600 dark:text-dark-400">
						We ripped out the expensive parts of traditional web platforms and replaced them with
						raw edge performance.
					</p>
				</div>

				<div class="grid gap-8 md:grid-cols-3">
					<div class="glass-card p-8 transition-transform hover:-translate-y-1 feature-card opacity-0">
						<div
							class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
								/></svg
							>
						</div>
						<h3 class="mb-2 text-xl font-bold">GitHub as a Database</h3>
						<p class="text-dark-600 dark:text-dark-400">
							Your site data is stored as raw HTML files directly in a GitHub repository via REST
							API. No SQL, no MongoDB, no bills.
						</p>
					</div>

					<div class="glass-card p-8 transition-transform hover:-translate-y-1 feature-card opacity-0">
						<div
							class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/></svg
							>
						</div>
						<h3 class="mb-2 text-xl font-bold">Cloudflare Edge Proxy</h3>
						<p class="text-dark-600 dark:text-dark-400">
							Visitors don't wait. SvelteKit intercepts requests and serves your cached GitHub files
							from the nearest Cloudflare Edge node globally.
						</p>
					</div>

					<div class="glass-card p-8 transition-transform hover:-translate-y-1 feature-card opacity-0">
						<div
							class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
								/></svg
							>
						</div>
						<h3 class="mb-2 text-xl font-bold">Visual Svelte Engine</h3>
						<p class="text-dark-600 dark:text-dark-400">
							Drag and drop components in real-time. The powerful Svelte engine compiles your visual
							design into pure static HTML on publish.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="relative overflow-hidden py-32 cta-section">
			<div class="absolute inset-0 premium-gradient opacity-10"></div>
			<div class="relative z-10 mx-auto max-w-4xl px-6 text-center cta-content opacity-0">
				<h2 class="mb-6 text-4xl font-bold md:text-5xl">Ready to break free?</h2>
				<p class="mb-10 text-xl text-dark-600 dark:text-dark-300">
					Join the open-source movement of zero-cost web hosting and intuitive design.
				</p>
				<a
					href="/builder"
					class="inline-flex items-center gap-2 rounded-xl bg-dark-900 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-transform hover:scale-105 dark:bg-white dark:text-dark-900"
				>
					Launch Rakit Builder
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"
						></polyline></svg
					>
				</a>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer
		class="border-t border-dark-200/50 py-12 text-center text-sm text-dark-500 dark:border-dark-800/50"
	>
		<p>Open Source &middot; Built with SvelteKit & Tailwind CSS</p>
	</footer>
</div>

<style>
	/* Ensure smooth scrolling for anchor links */
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
