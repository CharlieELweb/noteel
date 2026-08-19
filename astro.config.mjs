// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from "@astrojs/markdown-remark";
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import starlightGiscus from 'starlight-giscus'

export default defineConfig({
	site: 'https://charlieelweb.github.io',
	base: '/noteel',

	integrations: [starlight({
		title: 'NoteEL',
		routeMiddleware: './src/routeData.ts',
		favicon: '/noteel/favicon.ico',
		head: [
			{
				tag: 'link',
				attrs: {
					href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
					rel: 'stylesheet',
				},
			},
		],
		logo: {

			src: './src/assets/my-logo.png',
			replacesTitle: true,
		},

		customCss: [
			// Relative path to your custom CSS file
			'./src/styles/overrides.css',
			'@fontsource-variable/chiron-goround-tc'
		],
		components: {
			Header: './src/components/Header.astro',
			Hero: './src/components/Hero.astro',
			PageTitle: './src/components/PageTitle.astro',
			Pagination: './src/components/Pagination.astro',
		},
		plugins: [
			starlightGiscus({
				repo: "charlieelweb/noteel",
				repoId: "R_kgDOT9X-jw",
				category: "Comment",
				categoryId: "DIC_kwDOT9X-j84DDtrC",
				lazy: true,
			})
		],
	}),
	],
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeMathjax],
		})
	}
});