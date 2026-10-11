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

  // 2. Fetch site settings
  let settings = null;
  try {
    settings = await client.fetch(`*[_type == "siteSettings"][0]`);
  } catch (err) {
    console.error('Error fetching settings:', err);
  }

  // 3. Fallback demo data if post isn't in Sanity yet
  const fallbackArticles: Record<string, any> = {
    'echoes-of-the-caribbean': {
      title: 'Echoes of the Caribbean – Preserving the Past, Empowering the Future',
      categoryTitle: 'Podcasts & SEND',
      authorName: 'Ezra Rushen',
      publishedAt: '2025-07-30T10:00:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&auto=format&fit=crop&q=80',
      content: [
        "We're delighted to announce the release of the fourth captivating episode of our podcast, Echoes of the Caribbean. A vibrant journey through the stories and experiences of the Windrush Generation.",
        "Produced and recorded by our talented interns and students at DISC, this episode explores oral histories, cultural preservation, and digital storytelling techniques.",
        "Through hands-on recording, audio editing, and interview coordination, students gain industry-recognised sound design and podcasting credentials, opening doors to careers in creative media.",
      ],
    },
    'your-dna-manchester': {
      title: 'Your DNA Manchester: Celebrating Young Creative Talent',
      categoryTitle: 'Careers & News',
      authorName: 'Ezra Rushen',
      publishedAt: '2025-05-28T10:00:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
      content: [
        "On Friday 7th March, we marked another fantastic year of Your Digital News Agency (Your DNA), our flagship outreach programme empowering young people to develop digital skills and creative confidence.",
        "The celebration event took place at Heron House, home to the Greater Manchester digital community. Over 100 students from partner schools presented websites, video content, and branding packages created during their workshops.",
        "Our industry mentors praised the students' professionalism and innovative problem-solving, with several students securing work experience opportunities directly from employers.",
      ],
    },
    'digital-advantage-wins-gold-award': {
      title: 'Digital Advantage Wins Neurodiversity Employment (NDEI) Gold Award',
      categoryTitle: 'Awards',
      authorName: 'Digital Advantage Team',
      publishedAt: '2025-04-03T10:00:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=1200&auto=format&fit=crop&q=80',
      content: [
        "Digital Advantage are proud to announce that we have recently been awarded the Neuro Diversity Employment Index (NDEI) Gold Award by Autistica, the UK's leading research-led campaigning organisation for Autism.",
        "The NDEI is the only gold-standard evidence-based framework of its kind in the UK, evaluating workplace inclusion, specialist educational pathways, and sustained employment outcomes.",
        "This recognition confirms our commitment to creating accessible, neurodivergent-friendly learning environments that truly bridge the gap between education and high-value tech employment.",
      ],
    },
    'celebrating-a-decade-of-outreach-in-lancashire': {
      title: 'Celebrating a Decade of Outreach Programmes in Lancashire',
      categoryTitle: 'Outreach',
      authorName: 'Ezra Rushen',
      publishedAt: '2024-09-30T10:00:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
      content: [
        "Digital Advantage is delighted to announce that once again they have secured funding from our long-term partners at Future U and Lancashire County Council to run outreach activities at schools and colleges across the county.",
        "This long-standing collaboration started in 2014; over that time more than a thousand students have completed vocational digital challenges.",
        "We look forward to expanding into three new college campuses this academic year, providing specialist digital equipment and industry mentor support.",
      ],
    },
  };

  const article = post || fallbackArticles[slug];

  if (!article) {
    notFound();
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recent update';
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8FAFC] text-slate-800">
      <Header activePage="BLOG" phoneNumber={settings?.phoneNumber} />

      <main className="flex-grow py-12 sm:py-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-green-600 mb-8 transition-colors focus:outline-none focus:ring-4 focus:ring-green-500 rounded px-2 py-1"
          >
            ← Back to all posts
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3.5 py-1 bg-green-100 text-green-800 font-bold text-xs uppercase tracking-wider rounded-full">
                {article.categoryTitle || 'Article'}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {formatDate(article.publishedAt)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-200 text-sm font-semibold text-slate-600">
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
          {article.imageUrl && (
            <div className="mb-12 rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg max-h-[480px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Body */}
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

          {/* Return CTA */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center">
            <Link
              href="/blog"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all"
            >
              ← Back to Blog
            </Link>
            <Link
              href="/contact-us"
              className="text-green-600 hover:text-green-700 font-bold"
            >
              Contact our team →
            </Link>
          </div>
        </article>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
