import {defineField, defineType} from 'sanity'

export const headerSettingsType = defineType({
  name: 'headerSettings',
  title: 'Header & Navigation Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'phoneNumber',
      title: 'Header Phone Number',
      type: 'string',
      description: 'Displayed in top header bar (e.g. (0161) 410 2040)',
      initialValue: '(0161) 410 2040',
    }),
    defineField({
      name: 'email',
      title: 'Primary Contact Email',
      type: 'string',
      initialValue: 'hello@digitaladvantage.org.uk',
    }),
  ],
})
