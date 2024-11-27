import { z, defineCollection } from "astro:content";
import type { Social } from "@consts";

const testimonialsCollection = defineCollection({
    type: "data",
    schema: z.object({
        author: z.object({
            name: z.string(),
            title: z.string(),
        }),
        quote: z.string(),
    }),
});

const memberSocialObject = z.object({
    type: z.custom<Social>(),
    text: z.string(),
});

const eventCollection = defineCollection({
    type: "data",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            link: z.string(),
            text: z.string(),
            date: z.coerce.date(),
            image: z.object({
                src: image(),
                alt: z.string(),
            }),
        }),
});

const faqCollection = defineCollection({
    type: "data",
    schema: z.object({
        question: z.string(),
        answer: z.string(),
    }),
});

const membersCollection = defineCollection({
    type: "data",
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            title: z.string(),
            description: z.string(),
            image: z.object({
                src: image(),
                alt: z.string(),
            }),
            socials: z.array(memberSocialObject).refine(
                (arr) => {
                    const uniqueKeys = new Set(arr.map((item) => item.type));
                    return uniqueKeys.size === arr.length;
                },
                {
                    message: "Duplicate social types are not allowed.",
                },
            ),
        }),
});

export const collections = {
    testimonials: testimonialsCollection,
    members: membersCollection,
    events: eventCollection,
    faqs: faqCollection
};
