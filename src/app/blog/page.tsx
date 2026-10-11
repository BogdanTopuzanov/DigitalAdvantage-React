import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 0; // Disable static caching so updates from Sanity appear instantly

interface BlogPost {
  title: string;
  date: string;
  author: string;
  text: string;
  tags: string[];
  image: string;
  slug: string;
  categories?: string[];
  externalUrl?: string;
  isFromSanity?: boolean;
}

export default async function BlogPage() {
  // 1. Fetch dynamic settings
  const headerSettings = await client.fetch('coalesce(*[_type == "headerSettings"][0], *[_type == "siteSettings"][0])');
  const footerSettings = await client.fetch('coalesce(*[_type == "footerSettings"][0], *[_type == "siteSettings"][0])');

  // 2. Fetch posts from Sanity if any exist
  let sanityPosts: BlogPost[] = [];
  try {
    const rawSanity = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      "author": author->name,
      "categories": categories[]->title,
      excerpt
    }`);

    if (rawSanity && rawSanity.length > 0) {
      sanityPosts = rawSanity.map((p: any) => ({
        title: p.title || 'Untitled Post',
        date: p.publishedAt
          ? new Date(p.publishedAt).toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : 'Recent Post',
        author: p.author || 'Digital Advantage',
        text: p.excerpt || 'Read this newly published story directly from our Sanity content management system.',
        tags: p.categories || ['News', 'Digital Advantage'],
        image: p.image || '/images/blog/Celebration-event-County-Hall-2025-2-460x260_c.webp',
        slug: p.slug || 'post',
        categories: p.categories || ['News'],
        isFromSanity: true,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch posts from Sanity:', error);
  }

  // 3. The 9 Authentic Publications from Digital Advantage
  const authenticPosts: BlogPost[] = [
    {
      title: 'Your DNA – Empowering SEND Students Through Digital Storytelling',
      date: 'Wednesday, 30 July 2025',
      author: 'Ezra Rushen',
      text: "Your Digital News Agency, or Your DNA for short, is Digital Advantage's outreach programme. Your DNA goes into schools and colleges across the North West, delivering an intensive and incredibly valuable digital work experience programme.",
      tags: ['digital careers', 'Podcasts', 'SEND'],
      image: '/images/blog/Celebration-event-County-Hall-2025-2-460x260_c.webp',
      slug: 'your-dna',
      categories: ['Careers', 'News'],
      externalUrl: 'https://www.digitaladvantage.org.uk/news/your-dna/',
    },
    {
      title: 'Echoes of the Caribbean – Preserving the Past, Empowering the Future',
      date: 'Wednesday, 30 July 2025',
      author: 'Ezra Rushen',
      text: "We're delighted to announce the release of the fourth captivating episode of our podcast, Echoes of the Caribbean. A vibrant journey through the stories and experiences of the Windrush Generation.",
      tags: ['digital careers', 'Podcasts', 'SEND'],
      image: '/images/blog/Caribean02-1-scaled-460x260_c.jpg',
      slug: 'echoes-of-the-caribbean',
      categories: ['Careers', 'News'],
      externalUrl: 'https://www.digitaladvantage.org.uk/news/echoes-of-the-caribbean-2/',
    },
    {
      title: 'Celebrating a decade of outreach programmes in Lancashire.',
      date: 'Monday, 30 September 2024',
      author: 'Ezra Rushen',
      text: 'Digital Advantage is delighted to announce that once again they have secured funding from our long-term partners at Future U and Lancashire County Council to run outreach activities at schools and colleges across the county, in the academic year 2024/25. This long-standing collaboration started in 2014; over that time more than a thousand students have',
      tags: ['careers', 'digital careers', 'Digital Training', 'inclusivity', 'neurodiverse', 'SEND'],
      image: '/images/blog/john-thompson-460x260_c.png',
      slug: 'celebrating-a-decade-of-outreach-programmes-in-lancashire',
      categories: ['News', 'Outreach'],
      externalUrl: 'https://www.digitaladvantage.org.uk/news/celebrating-a-decade-of-outreach-programmes-in-lancashire/',
    },
    {
      title: 'Digital Skills Partners for Schools and Colleges',
      date: 'Wednesday, 19 June 2024',
      author: 'Ezra Rushen',
      text: 'For 7 years now we have been running unique digital skills programmes with schools from across the region, and they are still a fantastic way of helping young people equip themselves for life in the 21st century and for schools to work with industry experts to inspire the next generation of digital makers. This year’s',
      tags: ['careers', 'digital careers', 'Digital Training', 'inclusivity', 'neurodiverse', 'SEND'],
      image: '/images/blog/Screenshot-2024-06-13-at-14.26.45-2-460x260_c.png',
      slug: 'digital-skills-partners-for-schools-and-colleges',
      categories: ['Careers', 'Education'],
      externalUrl: 'https://www.digitaladvantage.org.uk/news/digital-skills-partners-for-schools-and-colleges/',
    },
    {
      title: 'Discovering Social Media Marketing: A Day with Ben Simpson',
      date: 'Friday, 15 March 2024',
      author: 'Ezra Rushen',
      text: 'On the 8th of February, DISC was delighted to host a special one-day workshop on Social Media Marketing, led by the talented Ben Simpson. Ben, who serves as a Governor of DISC, is not only a freelance social media manager and content creator but also a film-maker with a rich background in digital media. The',
      tags: ['careers', 'digital careers', 'Digital Training', 'inclusivity', 'neurodiverse', 'SEND'],
      image: '/images/blog/IMG_6192-scaled-460x260_c.jpg',
      slug: 'discovering-social-media-marketing-a-day-with-ben-simpson',
      categories: ['Workshops', 'DISC'],
      externalUrl: 'https://www.digitaladvantage.org.uk/news/discovering-social-media-marketing-a-day-with-ben-simpson/',
    },
    {
      title: 'Meetings that Make a Difference',
      date: 'Tuesday, 23 January 2024',
      author: 'Andy Lovatt',
      text: 'Towards the back end of last year we had a great meeting with James Inman and his team at Inclusive Jobs. Great meetings are rare and the butt of many negative quotes and jokes. It’s easy to arrange a meeting but much harder to make things happen afterwards. I am not a fan of the',
      tags: ['careers', 'digital careers', 'Digital Training', 'inclusivity', 'neurodiverse', 'SEND'],
      image: '/images/blog/inclusiveJobs-460x260_c.png',
      slug: 'meetings-that-make-a-difference',
      categories: ['Partnerships'],
      externalUrl: 'https://www.digitaladvantage.org.uk/news/meetings-that-make-a-difference/',
    },
    {
      title: 'Dylan Apprenticeship Story',
      date: 'Wednesday, 30 November 2022',
      author: 'Ezra Rushen',
      text: 'Dylan originally joined the Digital Advantage as part of Digital Inc. internship in 2021. The course was transformational for him, building his digital skills, along with confidence and timekeeping. An asset to any company, Digital Advantage was keen to keep hold of Dylan and were delighted that the Co-op stepped forward to partially fund his',
      tags: ['careers', 'digital careers', 'digital inc', 'SEND'],
      image: '/images/blog/dylan-460x260_c.png',
      slug: 'dylan-apprenticeship-story',
      categories: ['Case Studies', 'Apprenticeships'],
      externalUrl: 'https://www.digitaladvantage.org.uk/careers/dylan-apprenticeship-story/',
    },
    {
      title: 'Launch of DISC',
      date: 'Wednesday, 30 November 2022',
      author: 'Ezra Rushen',
      text: 'Digital Advantage is proud to announce that DISC, the Digital Independent Specialist College in Manchester, has celebrated completing it’s first half term by welcoming ten new interns. They started their exciting journey in September, completing a four week induction, experimenting with digital photography, video, storyboarding, animation, graphics, scriptwriting, UX design, podcasting and web design. Be sure',
      tags: ['careers', 'digital careers', 'SEND'],
      image: '/images/blog/DISC-logo-with-title-2-460x260_c.png',
      slug: 'launch-of-disc',
      categories: ['DISC College', 'News'],
      externalUrl: 'https://www.digitaladvantage.org.uk/news/launch-of-disc/',
    },
    {
      title: 'Pupils with SEND learn skills for digital careers',
      date: 'Thursday, 16 September 2021',
      author: 'Ezra Rushen',
      text: 'We have a case study featured in this months issue of Children & Young People Now. It looks at our Digital Inc. Agency that offered digital supported internships to young people with SEND. It charts the progress of Beck, one of our interns, who we first met at one of our Pop-Up Digital Agency deliveries,',
      tags: ['careers', 'digital careers', 'digital inc', 'SEND'],
      image: '/images/blog/WP_Digital_Advantage_SEND_140219_04-scaled-460x260_c.jpg',
      slug: 'pupils-with-send-learn-skills-for-digital-careers',
      categories: ['SEND', 'Case Studies'],
      externalUrl: 'https://www.digitaladvantage.org.uk/careers/pupils-with-send-learn-skills-for-digital-careers-2/',
    },
  ];

  // Merge Sanity posts at the top, followed by authentic posts
  const allPosts = [...sanityPosts, ...authenticPosts.filter((ap) => !sanityPosts.some((sp) => sp.slug === ap.slug))];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F4F6F8] text-slate-800">
      {/* Skip link */}
      <a
        href="#blog-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-6 py-3 z-[100] rounded-lg shadow-xl focus:ring-4 focus:ring-green-300 outline-none font-bold"
      >
        Skip to blog content
      </a>

      {/* Header with active BLOG indicator */}
      <Header activePage="BLOG" phoneNumber={headerSettings?.phoneNumber} />

      {/* Page Title Banner */}
      <div className="bg-white border-b border-slate-200/80 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Blog
              </h1>
              <p className="mt-2 text-slate-500 font-medium text-sm">
                Stories, updates, and podcasts from Digital Advantage and DISC
              </p>
            </div>
            
            {/* Breadcrumb indicator */}
            <div className="text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-800">Blog</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Blog Listing */}
      <main id="blog-main" className="flex-grow py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {allPosts.map((post, index) => (
              <article
                key={post.slug || index}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden p-6 sm:p-8"
              >
                {/* Header: Title, Date, Author */}
                <header className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 hover:text-green-600 transition-colors leading-snug tracking-tight">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
                    <span className="text-slate-500">{post.date}</span>
                    <span>•</span>
                    <span>by <span className="text-green-700 font-bold">{post.author}</span></span>
                    {post.isFromSanity && (
                      <>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded font-bold uppercase text-[10px]">
                          Sanity CMS Live
                        </span>
                      </>
                    )}
                  </div>
                </header>

                {/* Body: Left Image, Right Text */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Image */}
                  <div className="md:col-span-5 lg:col-span-5">
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="block group overflow-hidden rounded-xl border border-slate-100 shadow-inner bg-slate-50 relative aspect-[16/9]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>

                  {/* Right Column: Intro Text */}
                  <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-between h-full">
                    <p className="text-slate-600 text-base leading-relaxed font-normal">
                      {post.text}
                    </p>

                    {/* Tags block */}
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <div className="flex flex-wrap items-center gap-2">
                        {post.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-block px-3 py-1 bg-slate-100 hover:bg-green-50 text-slate-600 hover:text-green-700 text-xs font-semibold rounded-full border border-slate-200/80 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More button & No Comments badge */}
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all focus:outline-none focus:ring-4 focus:ring-green-400"
                        >
                          Read more
                          <span aria-hidden="true">→</span>
                        </Link>

                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                          <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0h-2v2h2V9z" clipRule="evenodd" />
                          </svg>
                          <span>No Comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer metadata line */}
                {post.categories && post.categories.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium flex items-center gap-2">
                    <span className="text-slate-500 font-semibold">Published in:</span>
                    <span>{post.categories.join(', ')}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Footer from Home Page */}
      <Footer settings={footerSettings} />
    </div>
  );
}
