import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {testimonialType} from './testimonialType'
import {homePageSettingsType} from './homePageSettingsType'
import {headerSettingsType} from './headerSettingsType'
import {footerSettingsType} from './footerSettingsType'
import {siteSettingsType} from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // 1. Страницы и разделы
    homePageSettingsType,
    headerSettingsType,
    footerSettingsType,

    // 2. Блог и статьи
    postType,
    categoryType,
    authorType,

    // 3. Отзывы и глобальные данные
    testimonialType,
    siteSettingsType,
    blockContentType,
  ],
}
