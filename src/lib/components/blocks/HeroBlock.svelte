<script lang="ts">
  const { title = "Supercharge your workflow.", subtitle = "Stop wasting time on servers.", ctaText = "Get Started", ctaLink = "#", bgClass = "bg-dark-50 dark:bg-dark-950" } = $props<{
      title?: string;
      subtitle?: string;
      ctaText?: string;
      ctaLink?: string;
      bgClass?: string;
  }>();
</script>

<div class={`w-full py-24 md:py-32 px-6 flex flex-col items-center justify-center text-center ${bgClass} transition-colors duration-300`}>
  <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-dark-900 dark:text-white">
          {title}
      </h1>
      <p class="text-lg md:text-xl text-dark-600 dark:text-dark-300 mb-10 max-w-2xl mx-auto">
          {subtitle}
      </p>
      {#if ctaText}
      <a href={ctaLink} class="inline-flex justify-center items-center px-8 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium text-lg transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-105 active:scale-95">
          {ctaText}
      </a>
      {/if}
  </div>
</div>
