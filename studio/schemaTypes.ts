import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({ name: "price", type: "string" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
  ],
});

export const news = defineType({
  name: "news",
  title: "News",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({ name: "body", type: "text", rows: 12 }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "instagram", type: "url", title: "Instagram" }),
    defineField({ name: "facebook", type: "url", title: "Facebook" }),
    defineField({ name: "heroVideoUrl", type: "url", title: "Hero video URL" }),
    defineField({
      name: "heroPoster",
      type: "image",
      title: "Hero poster",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoNote",
      type: "string",
      title: "Logo note",
      description: "The site uses an inline SVG lockup. Upload brand marks here if needed later.",
    }),
  ],
});
