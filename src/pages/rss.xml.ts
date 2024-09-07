import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getCollection } from "astro:content"

export async function GET(context: APIContext) {
    const posts = await getCollection("posts", ({ data }) => {
        return data.status === "published"
    })

    return rss({
        title: "Dishan Sachin’s Blog",
        description: "A blog about software development.",
        site: context.url,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.publishedAt,
            description: post.data.description,
            author: "Dishan Sachin",
            link: `/blog/${post.slug}`,
        })),
    })
}
