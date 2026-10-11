import {defineField, defineType} from 'sanity'

export const headerSettingsType = defineType({
  name: 'headerSettings',
  title: '🧭 Шапка сайта (Header & Contacts)',
  type: 'document',
  fields: [
    defineField({
      name: 'phoneNumber',
      title: 'Номер телефона в шапке',
      type: 'string',
      description: 'Отображается в правом верхнем углу (напр. (0161) 410 2040)',
      initialValue: '(0161) 410 2040',
    }),
    defineField({
      name: 'email',
      title: 'Основной Email',
      type: 'string',
      initialValue: 'hello@digitaladvantage.org.uk',
    }),
  ],
})
