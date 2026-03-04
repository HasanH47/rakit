import type { Block, BlockType } from '../../state/canvas.svelte.js';

/**
 * Mappable generator functions that consume JSON properties 
 * and convert them into raw HTML Strings infused with Tailwind classes.
 * We avoid Svelte's `render` function here to keep edge footprint insanely low.
 */
const generators: Record<BlockType, (props: Record<string, unknown>) => string> = {
    'hero': (props) => {
        const title = props.title as string || '';
        const subtitle = props.subtitle as string || '';
        const ctaText = props.ctaText as string || '';
        const ctaLink = props.ctaLink as string || '#';
        const bgClass = props.bgClass as string || 'bg-white dark:bg-dark-900';
        const paddingClass = props.paddingClass as string || 'py-24';
        const alignment = props.alignment as string || 'text-center';
        return `
            <section class="w-full ${paddingClass} px-6 ${bgClass} transition-colors duration-300">
                <div class="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[50vh] ${alignment}">
                    <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-dark-900 dark:text-white">
                        ${title}
                    </h1>
                    <p class="text-xl md:text-2xl text-dark-600 dark:text-dark-400 mb-10 max-w-2xl leading-relaxed">
                        ${subtitle}
                    </p>
                    ${ctaText ? `
                        <a href="${ctaLink}" class="px-8 py-4 rounded-full premium-gradient text-white font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-brand-500/20">
                            ${ctaText}
                        </a>
                    ` : ''}
                </div>
            </section>
        `;
    },
    
    'text': (props) => {
        const content = props.content as string || '';
        const align = props.align as string || 'text-left';
        const bgClass = props.bgClass as string || 'bg-white dark:bg-dark-900';
        const paddingClass = props.paddingClass as string || 'py-16';
        return `
            <section class="w-full ${paddingClass} px-6 ${bgClass} transition-colors duration-300">
                <div class="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-brand ${align}">
                    ${content}
                </div>
            </section>
        `;
    },
    
    'feature-grid': (props) => {
        const heading = (props.heading as string) || '';
        const subheading = (props.subheading as string) || '';
        const features = (props.features as Array<{title?: string, description?: string, icon?: string}>) || [];
        const columns = (props.columns as number) || 3;
        const bgClass = (props.bgClass as string) || 'bg-dark-50 dark:bg-dark-950';

        let gridColsClass = 'md:grid-cols-3';
        if (columns === 2) gridColsClass = 'md:grid-cols-2';
        if (columns === 4) gridColsClass = 'md:grid-cols-2 lg:grid-cols-4';

        const featureCards = features.map((f) => `
            <div class="glass-card border border-dark-200/50 p-8 transition-transform hover:-translate-y-1 dark:border-dark-800/50">
                ${f.icon ? `<div class="mb-6 text-4xl">${f.icon}</div>` : `
                <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                    <span class="text-xl font-bold">✦</span>
                </div>`}
                <h3 class="mb-2 text-xl font-bold text-dark-900 dark:text-white">${f.title || ''}</h3>
                <p class="text-dark-600 dark:text-dark-400">${f.description || ''}</p>
            </div>
        `).join('');

        return `
            <section class="w-full px-6 ${props.paddingClass || 'py-24'} ${bgClass} transition-colors duration-300">
                <div class="mx-auto max-w-7xl">
                    ${(heading || subheading) ? `
                        <div class="mb-16 text-center">
                            ${heading ? `<h2 class="mb-4 text-3xl font-bold text-dark-900 md:text-4xl dark:text-white">${heading}</h2>` : ''}
                            ${subheading ? `<p class="mx-auto max-w-2xl text-dark-600 dark:text-dark-400">${subheading}</p>` : ''}
                        </div>
                    ` : ''}
                    <div class="grid gap-8 ${gridColsClass}">
                        ${featureCards}
                    </div>
                </div>
            </section>
        `;
    },
    
    'footer': (props) => {
        const copyright = (props.copyright as string) || '';
        const links = (props.links as Array<{label: string, url: string}>) || [];
        const bgClass = (props.bgClass as string) || 'bg-dark-50 dark:bg-dark-950';
        
        const linkNodes = links.map((l) => `
            <a href="${l.url}" class="text-dark-500 transition-colors hover:text-brand-500 dark:text-dark-400 dark:hover:text-brand-400">
                ${l.label}
            </a>
        `).join('');

        return `
            <footer class="w-full border-t border-dark-200/50 px-6 ${props.paddingClass || 'py-12'} dark:border-dark-800/50 ${bgClass} transition-colors duration-300">
                <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                    <div class="text-sm text-dark-500 dark:text-dark-400">
                        ${copyright}
                    </div>
                    ${links.length > 0 ? `
                        <nav class="flex gap-6 text-sm">
                            ${linkNodes}
                        </nav>
                    ` : ''}
                </div>
            </footer>
        `;
    }
};

/**
 * Takes the raw canvas blocks and compiles a complete, valid HTML5 document.
 */
export function generateHtml(blocks: Block[], globalCss: string = ''): string {
    
    // 1. Generate the body content sequentially
    const bodyContent = blocks.map(block => {
        const generator = generators[block.type];
        if (generator) {
            return generator(block.properties);
        }
        return `<!-- Unknown block type: ${block.type} -->`;
    }).join('\n');

    // 2. Wrap in the Master Shell including CDN dependencies
    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth antialiased dark">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Website Built with Rakit</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS v4 CDN -->
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    
    ${globalCss ? `\n    <!-- Rakit Global Custom CSS -->\n    <style id="rakit-custom-css">\n${globalCss}\n    </style>\n` : ''}
    <!-- Native Rakit CSS Theme Emulation -->
    <style type="text/tailwindcss">
        @theme {
            --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
            --font-display: 'Outfit', ui-sans-serif, system-ui, sans-serif;
        
            --color-brand-50: #f0fdfa;
            --color-brand-100: #ccfbf1;
            --color-brand-200: #99f6e4;
            --color-brand-300: #5eead4;
            --color-brand-400: #2dd4bf;
            --color-brand-500: #14b8a6;
            --color-brand-600: #0d9488;
            --color-brand-700: #0f766e;
            --color-brand-800: #115e59;
            --color-brand-900: #134e4a;
        
            --color-dark-50: #f8fafc;
            --color-dark-100: #f1f5f9;
            --color-dark-200: #e2e8f0;
            --color-dark-300: #cbd5e1;
            --color-dark-400: #94a3b8;
            --color-dark-500: #64748b;
            --color-dark-600: #475569;
            --color-dark-700: #334155;
            --color-dark-800: #1e293b;
            --color-dark-900: #0f172a;
            --color-dark-950: #020617;
        }

        body {
            @apply bg-dark-50 text-dark-900 dark:bg-dark-950 dark:text-dark-50 font-sans;
        }

        h1, h2, h3, h4, h5, h6 {
            @apply font-display tracking-tight;
        }

        @utility glass {
            @apply dark:bg-dark-900/70 border border-white/20 bg-white/70 backdrop-blur-md dark:border-white/10;
        }

        @utility glass-card {
            @apply glass rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/20;
        }

        @utility text-glow {
            text-shadow: 0 0 20px rgba(45, 212, 191, 0.5);
        }

        @utility premium-gradient {
            @apply bg-linear-to-br from-brand-400 to-brand-600;
        }

        @utility premium-gradient-text {
            @apply premium-gradient bg-clip-text text-transparent;
        }
    </style>
</head>
<body class="flex flex-col min-h-screen">
    ${bodyContent}
</body>
</html>`;
}
