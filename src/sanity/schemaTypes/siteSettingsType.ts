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
    defineField({
      name: 'footerAbout',
      title: 'Footer: Описание компании (слева)',
      type: 'text',
      description: 'Краткий текст под логотипом в подвале',
    }),
    defineField({
      name: 'footerQuickLinks',
      title: 'Footer: Quick Links (Быстрые ссылки)',
      type: 'array',
      description: 'Каждая строка — отдельный пункт. Можно выбрать, делать ли ссылку активной.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Текст строки', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'isLink', title: 'Сделать кликабельной ссылкой?', type: 'boolean', initialValue: true },
            { name: 'url', title: 'URL ссылки (напр. /blog или https://...)', type: 'string' },
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
      title: 'Footer: Safeguarding (Защита и безопасность)',
      type: 'array',
      description: 'Строки для блока Safeguarding. Можно добавлять контакты, имена, ссылки на политики.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Текст строки', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'isLink', title: 'Сделать кликабельной ссылкой?', type: 'boolean', initialValue: false },
            { name: 'url', title: 'URL ссылки (напр. mailto:name@disc.ac.uk)', type: 'string' },
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
      title: 'Footer: Contact Us (Контакты)',
      type: 'array',
      description: 'Строки для блока контактов. Адрес, телефон, почта и т.д.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Текст строки', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'isLink', title: 'Сделать кликабельной ссылкой?', type: 'boolean', initialValue: false },
            { name: 'url', title: 'URL ссылки (напр. tel:01614102040 или https://maps...)', type: 'string' },
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
