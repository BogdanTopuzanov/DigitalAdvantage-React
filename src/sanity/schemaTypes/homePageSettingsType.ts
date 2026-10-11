import {defineField, defineType} from 'sanity'

export const homePageSettingsType = defineType({
  name: 'homePageSettings',
  title: 'Home Page Settings',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Hero & Mission' },
    { name: 'programmes', title: '2. Core Programmes (Cards)' },
    { name: 'highlights', title: '3. News & Highlights' },
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
      group: 'hero',
      description: 'Overview of charity and DISC specialist college provision',
    }),
    defineField({
      name: 'programmesHeading',
      title: 'Programmes Section Heading',
      type: 'string',
      group: 'programmes',
      initialValue: 'Just how do we reveal that talent?',
    }),
    defineField({
      name: 'programmesSubheading',
      title: 'Programmes Section Subheading',
      type: 'string',
      group: 'programmes',
      initialValue: 'There are 5 Digital Advantage programmes available, each designed to get the best out of young people.',
    }),
    defineField({
      name: 'homeProgrammes',
      title: 'Core Programmes Cards (e.g. DISC, PopUp, Online)',
      type: 'array',
      group: 'programmes',
      description: 'The cards shown under "There are 5 Digital Advantage programmes available..."',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Programme Name', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Learn More' },
            { name: 'linkUrl', title: 'Button URL', type: 'string', initialValue: '/disc' },
            { name: 'image', title: 'Card Header Image (Optional)', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'title', subtitle: 'linkUrl', media: 'image' },
          },
        },
      ],
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
