import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const post = await getCollection('posts');
    return rss({
        title: 'Dishan Sachin’s Blog',
        description: 'A blog about software development.',
        site: context.site,
        items: post.map((post) => ({
            title: post.data.title,
            pubDate: post.data.publishedAt,
            description: post.data.description,
            author: "Dishan Sachin",
            link: `/blog/${post.slug}`,
        })),
    });
}
