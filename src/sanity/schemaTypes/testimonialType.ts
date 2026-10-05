import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial (Отзыв)',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      description: 'Текст самого отзыва',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      description: 'Кто оставил отзыв (например: Paul Rogers)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Organization',
      type: 'string',
      description: 'Должность или организация (например: North Ridge High School)',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'role',
    },
  },
})
