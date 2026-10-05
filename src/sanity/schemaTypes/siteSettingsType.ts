import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Global Settings (Настройки)',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Main Headline (Главный заголовок)',
      type: 'string',
      description: 'Текст в самом центре главной страницы',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number (Номер телефона)',
      type: 'string',
      description: 'Отображается в шапке и подвале сайта',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email (Почта)',
      type: 'string',
    }),
  ],
})
