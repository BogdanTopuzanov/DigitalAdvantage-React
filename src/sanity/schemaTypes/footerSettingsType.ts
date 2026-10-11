import {defineField, defineType} from 'sanity'

export const footerSettingsType = defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  groups: [
    { name: 'general', title: '1. Brand & Organization' },
    { name: 'quickLinks', title: '2. Quick Links' },
    { name: 'safeguarding', title: '3. Safeguarding' },
    { name: 'contact', title: '4. Contact Us' },
  ],
  fields: [
    defineField({
      name: 'footerAbout',
      title: 'Footer About Text (Under Logo)',
      type: 'text',
      group: 'general',
      description: 'Brief summary of the charity mission displayed under the footer logo',
      initialValue: 'Digital Advantage is a registered charity in England and Wales. We help young neurodivergent people and individuals with SEND gain creative, digital and employability skills.',
    }),
    defineField({
      name: 'charityNumber',
      title: 'Charity Registration Number',
      type: 'string',
      group: 'general',
      initialValue: '1188836',
    }),
    defineField({
      name: 'footerQuickLinks',
      title: 'Quick Links Column',
      type: 'array',
      group: 'quickLinks',
      description: 'Add, edit, and reorder items. Choose whether each line is an active link or plain text.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Line Text', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'isLink', title: 'Make Clickable Link?', type: 'boolean', initialValue: true },
            { name: 'url', title: 'Target URL (e.g. /blog or /popup)', type: 'string' },
          ],
          preview: {
            select: { title: 'text', subtitle: 'url', isLink: 'isLink' },
            prepare({ title, subtitle, isLink }) {
              return {
                title: title || 'No Text',
                subtitle: isLink ? `Link: ${subtitle || '#'}` : 'Plain Text',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerSafeguarding',
      title: 'Safeguarding Column',
      type: 'array',
      group: 'safeguarding',
      description: 'Designated Safeguarding contacts and policy download links',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Line Text', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'isLink', title: 'Make Clickable Link?', type: 'boolean', initialValue: false },
            { name: 'url', title: 'Target URL (e.g. mailto:caroline.d@disc.ac.uk)', type: 'string' },
          ],
          preview: {
            select: { title: 'text', subtitle: 'url', isLink: 'isLink' },
            prepare({ title, subtitle, isLink }) {
              return {
                title: title || 'No Text',
                subtitle: isLink ? `Link: ${subtitle || '#'}` : 'Plain Text',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerContact',
      title: 'Contact Us Column',
      type: 'array',
      group: 'contact',
      description: 'Physical address, phone number, directions link',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Line Text', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'isLink', title: 'Make Clickable Link?', type: 'boolean', initialValue: false },
            { name: 'url', title: 'Target URL (e.g. tel:01614102040 or Google Maps URL)', type: 'string' },
          ],
          preview: {
            select: { title: 'text', subtitle: 'url', isLink: 'isLink' },
            prepare({ title, subtitle, isLink }) {
              return {
                title: title || 'No Text',
                subtitle: isLink ? `Link: ${subtitle || '#'}` : 'Plain Text',
              }
            },
          },
        },
      ],
    }),
  ],
})
