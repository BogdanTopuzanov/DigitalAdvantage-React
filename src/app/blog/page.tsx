import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 0; // Fresh content on every load

interface Post {
  _id?: string;
  title: string;
  slug: string;
  imageUrl?: string;
  publishedAt?: string;
  authorName?: string;
  categoryTitle?: string;
  excerpt?: string;
}

export default async function BlogPage() {
  // 1. Fetch real posts from Sanity
  let sanityPosts: Post[] = [];
  try {
    sanityPosts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      publishedAt,
      "authorName": author->name,
      "categoryTitle": categories[0]->title
    }`);
  } catch (error) {
    console.error('Failed to fetch posts from Sanity:', error);
  }

  // 2. Fetch global site settings
  let settings = null;
  try {
    settings = await client.fetch(`*[_type == "siteSettings"][0]`);
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
  }

  // 3. Fallback / Authentic posts from digitaladvantage.org.uk/blog/
  const fallbackPosts: Post[] = [
    {
      _id: 'sample-1',
      title: 'Echoes of the Caribbean – Preserving the Past, Empowering the Future',
      slug: 'echoes-of-the-caribbean',
      categoryTitle: 'Podcasts & SEND',
      authorName: 'Ezra Rushen',
      publishedAt: '2025-07-30T10:00:00Z',
      excerpt: "We're delighted to announce the release of the fourth captivating episode of our podcast, Echoes of the Caribbean. A vibrant journey through the stories and experiences of the Windrush Generation.",
      imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
    },
    {
      _id: 'sample-2',
      title: 'Your DNA Manchester: Celebrating Young Creative Talent',
      slug: 'your-dna-manchester',
      categoryTitle: 'Careers & News',
      authorName: 'Ezra Rushen',
      publishedAt: '2025-05-28T10:00:00Z',
      excerpt: 'Your Digital News Agency Celebration: Showcasing Young Talent Across Greater Manchester. Empowering young people with special educational needs to develop digital skills and creative confidence.',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    },
    {
      _id: 'sample-3',
      title: 'Digital Advantage Wins Neurodiversity Employment (NDEI) Gold Award',
      slug: 'digital-advantage-wins-gold-award',
      categoryTitle: 'Awards',
      authorName: 'Digital Advantage Team',
      publishedAt: '2025-04-03T10:00:00Z',
      excerpt: "Digital Advantage are proud to announce that we have been awarded the Neuro Diversity Employment Index (NDEI) Gold Award by Autistica, the UK's leading research organisation for Autism.",
      imageUrl: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=800&auto=format&fit=crop&q=80',
    },
    {
      _id: 'sample-4',
      title: 'Celebrating a Decade of Outreach Programmes in Lancashire',
      slug: 'celebrating-a-decade-of-outreach-in-lancashire',
      categoryTitle: 'Outreach',
      authorName: 'Ezra Rushen',
      publishedAt: '2024-09-30T10:00:00Z',
      excerpt: 'Securing funding from our long-term partners at Future U and Lancashire County Council to run outreach digital skills activities at schools and colleges for over 1,000 students.',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    },
  ];

  // Merge Sanity posts with fallbacks so the page always looks full and vibrant
  const allPosts = [...sanityPosts, ...fallbackPosts.filter(fp => !sanityPosts.some(sp => sp.slug === fp.slug))];
  const featuredPost = allPosts[0];
  const remainingPosts = allPosts.slice(1);

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
      {/* Skip link */}
      <a
        href="#blog-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-6 py-3 z-[100] rounded-lg shadow-xl focus:ring-4 focus:ring-green-300 outline-none font-bold"
      >
        Skip to blog content
      </a>

      {/* Header with active BLOG indicator */}
      <Header activePage="BLOG" phoneNumber={settings?.phoneNumber} />

      <main id="blog-content" className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/60 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-800 tracking-wider uppercase mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              News, Stories & Insights
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Digital Advantage <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Blog</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Discover stories from our students, outreach highlights across the Northwest, and insights into neurodivergent talent in the creative industries.
            </p>

            {/* Category Filter Pills */}
            <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
              {['All Stories', 'Careers', 'News', 'Podcasts', 'SEND', 'Outreach'].map((cat, i) => (
                <button
                  key={cat}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all focus:outline-none focus:ring-4 focus:ring-green-500 ${
                    i === 0
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-green-500 hover:text-green-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Featured Post Card */}
          {featuredPost && (
            <div className="mb-16">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40 overflow-hidden hover:shadow-2xl hover:border-green-500/50 transition-all duration-300 group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  
                  {/* Image column */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredPost.imageUrl || '/images/logo-header.png'}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 bg-green-600/95 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg">
                        {featuredPost.categoryTitle || 'Featured Story'}
                      </span>
                    </div>
                  </div>

                  {/* Content column */}
                  <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-4">
                        <time dateTime={featuredPost.publishedAt}>
                          {formatDate(featuredPost.publishedAt)}
                        </time>
                        <span>•</span>
                        <span>by {featuredPost.authorName || 'Digital Advantage'}</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-green-600 transition-colors leading-snug tracking-tight">
                        <Link href={`/blog/${featuredPost.slug || '#'}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>

                      <p className="mt-4 text-slate-600 leading-relaxed font-normal text-base line-clamp-3">
                        {featuredPost.excerpt || "Read more about this project and the incredible achievements of our young creatives at Digital Advantage."}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/blog/${featuredPost.slug || '#'}`}
                        className="inline-flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors focus:outline-none focus:ring-4 focus:ring-green-500 rounded px-2 py-1"
                      >
                        Read Full Article
                        <span aria-hidden="true">→</span>
                      </Link>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        4 min read
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Remaining Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <article
                key={post.slug || post._id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-md shadow-slate-200/30 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 hover:border-green-500/50 transition-all duration-300 group"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.imageUrl || '/images/logo-header.png'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md">
                        {post.categoryTitle || 'Story'}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      <span>•</span>
                      <span>{post.authorName || 'DA Team'}</span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 group-hover:text-green-600 transition-colors leading-snug tracking-tight">
                      <Link href={`/blog/${post.slug || '#'}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt || 'Explore this project, our training methodologies, and the impact created across schools and colleges.'}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug || '#'}`}
                    className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors focus:outline-none focus:ring-4 focus:ring-green-500 rounded px-1 py-0.5"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Call to action at bottom of blog */}
          <div className="mt-20 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto relative z-10">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
                Want to partner with Digital Advantage?
              </h3>
              <p className="text-slate-300 mb-8 text-base">
                We deliver funded digital skills programmes, supported internships, and experiential workshops across the North West.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact-us"
                  className="px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-green-500/50"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/disc"
                  className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-slate-500"
                >
                  Explore DISC College
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer settings={settings} />
    </div>
  );
}
