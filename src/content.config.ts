import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
    loader: glob({ pattern: "**/*,md", base: "./src/content/posts" }),
    schema: z.object({
        title: z.string(),
        date: z.string().transform((date) => new Date(date)),
        hidden: z.boolean().default(true),
    })
});

export const collection = { posts }