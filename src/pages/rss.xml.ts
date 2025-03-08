import rss from "@astrojs/rss";

import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
	const posts = await getCollection("post", ({ data }) => {
		return data.hidden !== true;
	});

	return rss({
		title: "Dishan Sachin",
		description: "Dishan Sachin's personal website",
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
		})),
		site: "",
	});
}
