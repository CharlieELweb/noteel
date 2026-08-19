// src/routeData.ts
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
	const { starlightRoute } = context.locals;
	const currentSlugArray = starlightRoute.entry.filePath.split("/")
	let new_sidebar = []

	starlightRoute.sidebar.forEach(item => {
		if (item.type == 'group') {
			item.entries.forEach(entry => {
				new_sidebar.push(entry);
			})
		}
	});

	starlightRoute.sidebar = new_sidebar.filter((item) => {
		const entryArray = item.href.split("/")

		return entryArray[entryArray.length - 3] == currentSlugArray[currentSlugArray.length - 2];
	});
	const nextUrlArray = starlightRoute.pagination.next?.href.split("/")
	if (nextUrlArray && nextUrlArray[nextUrlArray.length - 3] != currentSlugArray[currentSlugArray.length - 2]) {
		starlightRoute.pagination.next = undefined
	}
	const prevUrlArray = starlightRoute.pagination.prev?.href.split("/")
	if (prevUrlArray && prevUrlArray[prevUrlArray.length - 3] != currentSlugArray[currentSlugArray.length - 2]) {
		starlightRoute.pagination.prev = undefined
	}
});
