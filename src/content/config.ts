import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        publishedAt: z.date(),
        updatedAt: z.date().optional(),
        description: z.string(),
        author: z.string(),
        tags: z.array(z.string()).optional(),
        status: z.enum(['draft', 'published', 'featured']),
    }),
});

export const collections = {
    'posts': postsCollection,
};
