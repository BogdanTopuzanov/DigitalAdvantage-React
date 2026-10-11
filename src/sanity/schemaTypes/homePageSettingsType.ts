import {defineField, defineType} from 'sanity'

export const homePageSettingsType = defineType({
  name: 'homePageSettings',
  title: 'Home Page Settings',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Hero Section' },
    { name: 'mission', title: '2. Mission Statement' },
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
  ],
})
