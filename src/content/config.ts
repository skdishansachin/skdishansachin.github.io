import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        publishedAt: z.date(),
        updatedAt: z.date().optional(),
        description: z.string().min(100).max(140),
        isFeatured: z.boolean(),
        status: z.enum(['draft', 'published']),
    }),
});

export const collections = {
    posts: postsCollection,
};
