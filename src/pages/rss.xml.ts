import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
	const posts = await getCollection('posts');

	return rss({
		title: "Dishan Sachin's Blog",
		description: 'A blog about backend development, devops, and more.',
		site: context.site,
		items: posts.map(post => ({
			title: post.data.title,
			description: post.data.description,
			link: `/blog/${post.id}/`,
			date: post.data.date,
		})),
	});
}