import {defineField, defineType} from 'sanity'

export const homePageSettingsType = defineType({
  name: 'homePageSettings',
  title: 'Home Page Settings',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Hero Section' },
    { name: 'mission', title: '2. Mission Statement' },
    { name: 'highlights', title: '3. Home News Cards' },
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
      description: 'Main heading on first screen (Default: Hidden Talent Revealed)',
      initialValue: 'Hidden Talent Revealed',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Mission Description Paragraph',
      type: 'text',
      group: 'mission',
      description: 'Overview of charity and DISC specialist college provision',
    }),
    defineField({
      name: 'homeHighlights',
      title: 'Home Page Featured News Cards (Independent from Blog)',
      type: 'array',
      group: 'highlights',
      description: 'Create unique news cards specifically for the Home Page so they do not duplicate or mix with Blog articles.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Card Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Short Description', type: 'text', rows: 2 },
            { name: 'image', title: 'Card Image', type: 'image', options: { hotspot: true } },
            { name: 'linkUrl', title: 'Link URL (e.g. /blog/your-dna or https://...)', type: 'string' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'linkUrl', media: 'image' },
          },
        },
      ],
    }),
  ],
})
