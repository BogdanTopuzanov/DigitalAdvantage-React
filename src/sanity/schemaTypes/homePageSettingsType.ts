import {defineField, defineType} from 'sanity'

export const homePageSettingsType = defineType({
  name: 'homePageSettings',
  title: '🏠 Главная страница (Home Page)',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Первый экран (Hero)' },
    { name: 'mission', title: '2. Миссия и Описание' },
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Главный заголовок (Hero Headline)',
      type: 'string',
      group: 'hero',
      description: 'Текст в центре первого экрана (по умолчанию: Hidden Talent Revealed)',
      initialValue: 'Hidden Talent Revealed',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Основной текст миссии',
      type: 'text',
      group: 'mission',
      description: 'Текст под заголовком (описание фонда и колледжа DISC)',
    }),
  ],
})
