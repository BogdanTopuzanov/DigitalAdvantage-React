import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { PortableText } from 'next-sanity';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 0;

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;

  // 1. Fetch post from Sanity
  let post = null;
  try {
    post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        "imageUrl": mainImage.asset->url,
        publishedAt,
        "authorName": author->name,
        "categoryTitle": categories[0]->title,
        body
      }`,
      { slug }
    );
  } catch (err) {
    console.error('Error fetching post:', err);
  }

  // 2. Fetch settings
  const headerSettings = await client.fetch('coalesce(*[_type == "headerSettings"][0], *[_type == "siteSettings"][0])');
  const footerSettings = await client.fetch('coalesce(*[_type == "footerSettings"][0], *[_type == "siteSettings"][0])');

  // 3. Fallback database with all 9 authentic publications
  const fallbackArticles: Record<string, any> = {
    'your-dna': {
      title: 'Your DNA – Empowering SEND Students Through Digital Storytelling',
      categoryTitle: 'Careers & News',
      authorName: 'Ezra Rushen',
      publishedAt: 'Wednesday, 30 July 2025',
      imageUrl: '/images/blog/Celebration-event-County-Hall-2025-2-460x260_c.webp',
      content: [
        "Your Digital News Agency, or Your DNA for short, is Digital Advantage's outreach programme. Your DNA goes into schools and colleges across the North West, delivering an intensive and incredibly valuable digital work experience programme.",
        "Students work in simulated agency teams covering roles like journalists, videographers, graphic designers, and project managers. They interview local figures and produce genuine news packages.",
        "Over the years, this programme has empowered thousands of neurodivergent learners to develop confidence, teamwork, and modern digital portfolio pieces.",
      ],
      tags: ['digital careers', 'Podcasts', 'SEND'],
    },
    'echoes-of-the-caribbean': {
      title: 'Echoes of the Caribbean – Preserving the Past, Empowering the Future',
      categoryTitle: 'Podcasts & SEND',
      authorName: 'Ezra Rushen',
      publishedAt: 'Wednesday, 30 July 2025',
      imageUrl: '/images/blog/Caribean02-1-scaled-460x260_c.jpg',
      content: [
        "We're delighted to announce the release of the fourth captivating episode of our podcast, Echoes of the Caribbean. A vibrant journey through the stories and experiences of the Windrush Generation.",
        "Produced and recorded by our talented interns and students at DISC, this episode explores oral histories, cultural preservation, and digital storytelling techniques.",
        "Through hands-on recording, audio editing, and interview coordination, students gain industry-recognised sound design and podcasting credentials, opening doors to careers in creative media.",
      ],
      tags: ['digital careers', 'Podcasts', 'SEND'],
    },
    'celebrating-a-decade-of-outreach-programmes-in-lancashire': {
      title: 'Celebrating a decade of outreach programmes in Lancashire.',
      categoryTitle: 'News & Outreach',
      authorName: 'Ezra Rushen',
      publishedAt: 'Monday, 30 September 2024',
      imageUrl: '/images/blog/john-thompson-460x260_c.png',
      content: [
        "Digital Advantage is delighted to announce that once again they have secured funding from our long-term partners at Future U and Lancashire County Council to run outreach activities at schools and colleges across the county, in the academic year 2024/25.",
        "This long-standing collaboration started in 2014; over that time more than a thousand students have completed vocational digital challenges.",
        "Looking forward, we continue to bridge education and regional industry needs across Lancashire.",
      ],
      tags: ['careers', 'digital careers', 'Digital Training', 'inclusivity', 'neurodiverse', 'SEND'],
    },
    'digital-skills-partners-for-schools-and-colleges': {
      title: 'Digital Skills Partners for Schools and Colleges',
      categoryTitle: 'Careers & Education',
      authorName: 'Ezra Rushen',
      publishedAt: 'Wednesday, 19 June 2024',
      imageUrl: '/images/blog/Screenshot-2024-06-13-at-14.26.45-2-460x260_c.png',
      content: [
        "For 7 years now we have been running unique digital skills programmes with schools from across the region, and they are still a fantastic way of helping young people equip themselves for life in the 21st century.",
        "By inviting industry professionals into classrooms, schools can demonstrate real-world career paths to students with SEND.",
        "Our partners benefit from bespoke curricula tailored to individual learner profiles and modern creative software.",
      ],
      tags: ['careers', 'digital careers', 'Digital Training', 'inclusivity', 'neurodiverse', 'SEND'],
    },
    'discovering-social-media-marketing-a-day-with-ben-simpson': {
      title: 'Discovering Social Media Marketing: A Day with Ben Simpson',
      categoryTitle: 'Workshops & DISC',
      authorName: 'Ezra Rushen',
      publishedAt: 'Friday, 15 March 2024',
      imageUrl: '/images/blog/IMG_6192-scaled-460x260_c.jpg',
      content: [
        "On the 8th of February, DISC was delighted to host a special one-day workshop on Social Media Marketing, led by the talented Ben Simpson.",
        "Ben, who serves as a Governor of DISC, is not only a freelance social media manager and content creator but also a film-maker with a rich background in digital media.",
        "The workshop covered content strategy, analytics, video hooks, and practical campaigns that interns immediately implemented for real social channels.",
      ],
      tags: ['careers', 'digital careers', 'Digital Training', 'inclusivity', 'neurodiverse', 'SEND'],
    },
    'meetings-that-make-a-difference': {
      title: 'Meetings that Make a Difference',
      categoryTitle: 'Partnerships',
      authorName: 'Andy Lovatt',
      publishedAt: 'Tuesday, 23 January 2024',
      imageUrl: '/images/blog/inclusiveJobs-460x260_c.png',
      content: [
        "Towards the back end of last year we had a great meeting with James Inman and his team at Inclusive Jobs.",
        "Great meetings are rare and the butt of many negative quotes and jokes. It’s easy to arrange a meeting but much harder to make things happen afterwards.",
        "Our partnership with Inclusive Jobs aligns with our vision to expand real, sustainable supported employment for neurodivergent individuals.",
      ],
      tags: ['careers', 'digital careers', 'Digital Training', 'inclusivity', 'neurodiverse', 'SEND'],
    },
    'dylan-apprenticeship-story': {
      title: 'Dylan Apprenticeship Story',
      categoryTitle: 'Case Studies',
      authorName: 'Ezra Rushen',
      publishedAt: 'Wednesday, 30 November 2022',
      imageUrl: '/images/blog/dylan-460x260_c.png',
      content: [
        "Dylan originally joined Digital Advantage as part of our Digital Inc. internship in 2021.",
        "The course was transformational for him, building his digital skills, along with confidence and timekeeping.",
        "An asset to any company, Digital Advantage was keen to keep hold of Dylan and were delighted that the Co-op stepped forward to partially fund his apprenticeship.",
      ],
      tags: ['careers', 'digital careers', 'digital inc', 'SEND'],
    },
    'launch-of-disc': {
      title: 'Launch of DISC',
      categoryTitle: 'DISC College',
      authorName: 'Ezra Rushen',
      publishedAt: 'Wednesday, 30 November 2022',
      imageUrl: '/images/blog/DISC-logo-with-title-2-460x260_c.png',
      content: [
        "Digital Advantage is proud to announce that DISC, the Digital Independent Specialist College in Manchester, has celebrated completing it’s first half term by welcoming ten new interns.",
        "They started their exciting journey in September, completing a four week induction, experimenting with digital photography, video, storyboarding, animation, graphics, scriptwriting, UX design, podcasting and web design.",
        "DISC provides a supportive stepping stone towards high-value tech employment for young people with an EHCP.",
      ],
      tags: ['careers', 'digital careers', 'SEND'],
    },
    'pupils-with-send-learn-skills-for-digital-careers': {
      title: 'Pupils with SEND learn skills for digital careers',
      categoryTitle: 'Case Studies',
      authorName: 'Ezra Rushen',
      publishedAt: 'Thursday, 16 September 2021',
      imageUrl: '/images/blog/WP_Digital_Advantage_SEND_140219_04-scaled-460x260_c.jpg',
      content: [
        "We have a case study featured in this month's issue of Children & Young People Now.",
        "It looks at our Digital Inc. Agency that offered digital supported internships to young people with SEND.",
        "It charts the progress of Beck, one of our interns, who we first met at one of our Pop-Up Digital Agency deliveries, showing the long-term impact of experiential learning.",
      ],
      tags: ['careers', 'digital careers', 'digital inc', 'SEND'],
    },
  };

  const article = post || fallbackArticles[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Header activePage="BLOG" phoneNumber={headerSettings?.phoneNumber} />

      <main className="flex-grow py-12 sm:py-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-green-600 mb-8 transition-colors focus:outline-none focus:ring-4 focus:ring-green-500 rounded px-2 py-1"
          >
            ← Back to Blog
          </Link>

          {/* Article Header */}
          <header className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 font-bold text-xs uppercase tracking-wider rounded-full">
                {article.categoryTitle || 'Article'}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {article.publishedAt}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-geomanist-black text-slate-900 tracking-tight leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-3 pt-6 border-t border-slate-100 text-sm font-semibold text-slate-600">
              <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-800 font-bold flex items-center justify-center">
                {(article.authorName || 'DA')[0]}
              </div>
              <div>
                <p className="text-slate-900 font-bold">{article.authorName || 'Digital Advantage'}</p>
                <p className="text-xs text-slate-500">Author & Contributor</p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {(article.imageUrl || article.image || fallbackArticles[slug]?.imageUrl) && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.imageUrl || article.image || fallbackArticles[slug]?.imageUrl}
                alt={article.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
            <div className="prose prose-slate prose-lg max-w-none space-y-6 text-slate-700 leading-relaxed font-normal">
              {article.body ? (
                <PortableText value={article.body} />
              ) : (
                article.content?.map((para: string, i: number) => (
                  <p key={i} className="text-lg leading-relaxed text-slate-700">
                    {para}
                  </p>
                ))
              )}
            </div>

            {/* Tags */}
            {article.tags && (
              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Tags:</span>
                {article.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Return CTA */}
          <div className="mt-10 flex justify-between items-center">
            <Link
              href="/blog"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all"
            >
              ← Back to Blog
            </Link>
            <Link
              href="/#main-content"
              className="text-green-600 hover:text-green-700 font-bold"
            >
              Back to Home →
            </Link>
          </div>
        </article>
      </main>

      <Footer settings={footerSettings} />
    </div>
  );
}
