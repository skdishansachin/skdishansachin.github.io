import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const post = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    hidden: z.boolean().default(true),
  }),
});

export const collections = { post };