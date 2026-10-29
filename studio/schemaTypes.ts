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
    defineField({
      name: "title",
      title: "Name",
      description: "The name on the product card (Products page).",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      description: "Click Generate. Used internally; products do not have their own page yet.",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short text",
      description: "The few lines under the name on the product card.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "price",
      title: "Price",
      description: "Shown on the product card, e.g. 18 or €18.",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Photo",
      description: "The picture on the product card.",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Photo description" })],
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
    defineField({
      name: "title",
      title: "Title",
      description: "The headline on the News list and on the article page.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      description: "Click Generate from title. This becomes the article link, e.g. /news/spring-harvest/.",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short text",
      description: "The summary on the News list. Also used as the preview text when the page is shared.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "publishedAt",
      title: "Date",
      description: "Shown on the card and article. Newest dates appear first.",
      type: "datetime",
    }),
    defineField({
      name: "image",
      title: "Photo",
      description: "The picture on the News list and at the top of the article.",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Photo description" })],
    }),
    defineField({
      name: "body",
      title: "Full text",
      description: "The article itself. Only shown after someone clicks the news card.",
      type: "text",
      rows: 12,
    }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "instagram",
      type: "url",
      title: "Instagram",
      description: "The Instagram icon at the bottom of every page. Leave empty to hide the icon.",
    }),
    defineField({
      name: "facebook",
      type: "url",
      title: "Facebook",
      description: "The Facebook icon at the bottom of every page. Leave empty to hide the icon.",
    }),
    defineField({
      name: "heroVideoUrl",
      type: "url",
      title: "Home video link",
      description: "The full-screen video at the top of the Home page. Must be a direct video file link (ending in .mp4), not a YouTube page.",
    }),
    defineField({
      name: "heroPoster",
      type: "image",
      title: "Home video still",
      description: "The still image shown while the home video loads. Also used when the page is shared on social media.",
      options: { hotspot: true },
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      description: "Top-left of every page, footer, and the 404 page. Leave empty to keep the written KWA NYUKI lockup.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Photo description" })],
    }),
  ],
});
