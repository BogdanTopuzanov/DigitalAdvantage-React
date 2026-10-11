import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Digital Advantage Studio')
    .items([
      // --- SECTION 1: PAGES & LAYOUT ---
      S.documentTypeListItem('homePageSettings').title('1. Home Page Settings'),
      S.documentTypeListItem('headerSettings').title('2. Header & Phone Settings'),
      S.documentTypeListItem('footerSettings').title('3. Footer Settings (All Columns)'),

      S.divider(),

      // --- SECTION 2: BLOG & PUBLICATIONS ---
      S.documentTypeListItem('post').title('Blog: Articles & Posts'),
      S.documentTypeListItem('category').title('Blog: Categories'),
      S.documentTypeListItem('author').title('Blog: Authors'),

      S.divider(),

      // --- SECTION 3: SOCIAL PROOF ---
      S.documentTypeListItem('testimonial').title('Testimonials'),
    ])
