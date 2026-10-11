import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Partner Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      description: 'The testimonial feedback or recommendation statement',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Full Name',
      type: 'string',
      description: 'E.g. Paul Rogers',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / School / Organization',
      type: 'string',
      description: 'E.g. North Ridge High School or Greater Manchester Combined Authority',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'role',
    },
  },
})
