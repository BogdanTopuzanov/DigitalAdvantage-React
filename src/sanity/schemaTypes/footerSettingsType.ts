import {defineField, defineType} from 'sanity'

export const footerSettingsType = defineType({
  name: 'footerSettings',
  title: '⚓ Подвал сайта (Footer)',
  type: 'document',
  groups: [
    { name: 'general', title: '1. О компании (About & Logo)' },
    { name: 'quickLinks', title: '2. Быстрые ссылки (Quick Links)' },
    { name: 'safeguarding', title: '3. Защита (Safeguarding)' },
    { name: 'contact', title: '4. Контакты (Contact Us)' },
  ],
  fields: [
    defineField({
      name: 'footerAbout',
      title: 'Текст о фонде (слева под логотипом)',
      type: 'text',
      group: 'general',
      description: 'Краткое описание миссии организации в подвале',
      initialValue: 'Digital Advantage is a registered charity in England and Wales. We help young neurodivergent people and individuals with SEND gain creative, digital and employability skills.',
    }),
    defineField({
      name: 'charityNumber',
      title: 'Номер благотворительной организации',
      type: 'string',
      group: 'general',
      initialValue: '1188836',
    }),
    defineField({
      name: 'footerQuickLinks',
      title: 'Колонка: Quick Links (Быстрые ссылки)',
      type: 'array',
      group: 'quickLinks',
      description: 'Добавляйте, удаляйте и меняйте местами строки. Можно сделать строку ссылкой или оставить простым текстом.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Текст строки', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'isLink', title: 'Сделать кликабельной ссылкой?', type: 'boolean', initialValue: true },
            { name: 'url', title: 'URL ссылки (напр. /blog или /popup)', type: 'string' },
          ],
          preview: {
            select: { title: 'text', subtitle: 'url', isLink: 'isLink' },
            prepare({ title, subtitle, isLink }) {
              return {
                title: title || 'Без текста',
                subtitle: isLink ? `🔗 Ссылка: ${subtitle || '#'}` : '📄 Простой текст',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerSafeguarding',
      title: 'Колонка: Safeguarding (Защита и безопасность)',
      type: 'array',
      group: 'safeguarding',
      description: 'Контакты ответственного лица и ссылки на документы',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Текст строки', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'isLink', title: 'Сделать кликабельной ссылкой?', type: 'boolean', initialValue: false },
            { name: 'url', title: 'URL ссылки (напр. mailto:...)', type: 'string' },
          ],
          preview: {
            select: { title: 'text', subtitle: 'url', isLink: 'isLink' },
            prepare({ title, subtitle, isLink }) {
              return {
                title: title || 'Без текста',
                subtitle: isLink ? `🔗 Ссылка: ${subtitle || '#'}` : '📄 Простой текст',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerContact',
      title: 'Колонка: Contact Us (Контакты)',
      type: 'array',
      group: 'contact',
      description: 'Физический адрес, телефон, карта',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Текст строки', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'isLink', title: 'Сделать кликабельной ссылкой?', type: 'boolean', initialValue: false },
            { name: 'url', title: 'URL ссылки (напр. tel:... или ссылка на карту)', type: 'string' },
          ],
          preview: {
            select: { title: 'text', subtitle: 'url', isLink: 'isLink' },
            prepare({ title, subtitle, isLink }) {
              return {
                title: title || 'Без текста',
                subtitle: isLink ? `🔗 Ссылка: ${subtitle || '#'}` : '📄 Простой текст',
              }
            },
          },
        },
      ],
    }),
  ],
})
