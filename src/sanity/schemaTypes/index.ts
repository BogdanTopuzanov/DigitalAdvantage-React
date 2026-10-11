import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {testimonialType} from './testimonialType'
import {homePageSettingsType} from './homePageSettingsType'
import {headerSettingsType} from './headerSettingsType'
import {footerSettingsType} from './footerSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // 1. Pages & Layout Sections
    homePageSettingsType,
    headerSettingsType,
    footerSettingsType,

    // 2. Blog & Publications
    postType,
    categoryType,
    authorType,

    // 3. Social Proof & Rich Text
    testimonialType,
    blockContentType,
  ],
}
