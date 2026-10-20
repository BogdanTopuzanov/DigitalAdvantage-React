import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const revalidate = 0; // Disable static caching so updates from Sanity appear instantly

export default async function Home() {
  // Fetch posts from Sanity database
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url
  }`);

  // Fetch the latest testimonial
  const testimonial = await client.fetch(`*[_type == "testimonial"] | order(_createdAt desc)[0]`);

  // Fetch settings from Sanity (from dedicated schemas or legacy siteSettings)
  const headerSettings = await client.fetch('coalesce(*[_type == "headerSettings"][0], *[_type == "siteSettings"][0])');
  const footerSettings = await client.fetch('coalesce(*[_type == "footerSettings"][0], *[_type == "siteSettings"][0])');
  const homeSettings = await client.fetch(`coalesce(
    *[_type == "homePageSettings"] | order(_updatedAt desc)[0],
    *[_type == "siteSettings"][0]
  ) {
    heroTitle,
    heroSubtitle,
    programmesHeading,
    programmesSubheading,
    homeProgrammes[] {
      title,
      description,
      buttonText,
      linkUrl,
      "imageUrl": image.asset->url
    },
    homeHighlights[] {
      title,
      description,
      "imageUrl": image.asset->url,
      linkUrl
    }
  }`);

  const defaultProgrammes = [
    {
      title: 'DISC',
      description: "In September 2022 we opened our Digital Independent Specialist College (DISC), with partners SENDCode. Based in Manchester City Centre we established the UK's first Independent Specialist College.",
      buttonText: 'Learn More',
      linkUrl: '/disc',
      gradient: 'from-slate-300 to-slate-200'
    },
    {
      title: 'PopUp Digital Agency',
      description: 'Delivered over 30 hours across 5 days, the PopUp Digital Agency is our flagship experiential learning programme giving young people experience of working in a realistic digital agency environment.',
      buttonText: 'Play Now',
      linkUrl: '/popup',
      gradient: 'from-indigo-300 to-purple-200'
    },
    {
      title: 'Digital Advantage Online',
      description: 'A series of digital skills workshops that can be delivered as part of our face-to-face training programmes, or more flexibly in shorter chunks to augment the national curriculum.',
      buttonText: 'Learn More',
      linkUrl: '/digital-advantage-online',
      gradient: 'from-amber-300 to-orange-200'
    },
  ];

  const programmesList = (homeSettings?.homeProgrammes && homeSettings.homeProgrammes.length > 0)
    ? homeSettings.homeProgrammes
    : defaultProgrammes;

  const defaultHomeNews = [
    {
      title: 'Supported Internships at DISC',
      description: 'Flexible educational and employment pathways for young people aged 16 to 24 with an EHCP.',
      imageUrl: '/images/blog/DISC-logo-with-title-2-460x260_c.png',
      linkUrl: '/disc',
    },
    {
      title: 'Your DNA Outreach Programme',
      description: 'Funded creative and digital skills workshops delivered directly into schools across Greater Manchester.',
      imageUrl: '/images/blog/Celebration-event-County-Hall-2025-2-460x260_c.webp',
      linkUrl: '/blog/your-dna',
    },
    {
      title: 'Autistica NDEI Gold Award Winner',
      description: 'Recognised with the highest national benchmark for neurodiversity-inclusive employment pathways.',
      imageUrl: '/images/blog/john-thompson-460x260_c.png',
      linkUrl: '/blog',
    },
  ];

  const homeNewsCards = (homeSettings?.homeHighlights && homeSettings.homeHighlights.length > 0)
    ? homeSettings.homeHighlights
    : defaultHomeNews;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8FAFC] text-slate-800">
      {/* Skip to main content link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-6 py-3 z-[100] rounded-lg shadow-xl focus:ring-4 focus:ring-green-300 outline-none transition-all font-bold"
      >
        Skip to main content
      </a>

      {/* MODERN HEADER */}
      <Header activePage="HOME" phoneNumber={headerSettings?.phoneNumber} />

      {/* MAIN CONTENT */}
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        
        {/* Modern Hero Section */}
        <section className="relative bg-white overflow-hidden py-24 lg:py-32" aria-labelledby="hero-heading">
          {/* Decorative background blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 bg-gradient-to-r from-green-200 to-emerald-100 blur-3xl rounded-full pointer-events-none" aria-hidden="true"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 id="hero-heading" className="geomanist text-5xl sm:text-6xl font-black tracking-tight text-slate-900 mb-8 leading-tight">
              {homeSettings?.heroTitle || (
                <>Hidden Talent <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Revealed</span></>
              )}
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto font-medium">
              {homeSettings?.heroSubtitle || (
                <>Digital Advantage is a Manchester-based charity founded to help young people with Special Educational Needs and Disabilities (SEND) build the creative, digital and employability skills they need to thrive in the modern economy. We work with young people up to the age of 24, colleges and community settings across the Northwest, and through our Manchester city centre specialist college, DISC.</>
              )}
            </p>
            <p className="mt-6 text-lg font-bold text-slate-800 max-w-3xl mx-auto">
              Everything we do starts from the same belief: that neurodivergent and disabled young people have exceptional talent. Our job is to create the conditions in which that talent can flourish.
            </p>
          </div>
        </section>

       
        {/* Home News & Highlights Section (Independent from Blog) */}
        <section className="py-20 bg-slate-50 border-t border-slate-100" aria-labelledby="news-heading">
          <div className="text-center mb-16 max-w-3xl mx-auto px-4">
            <span className="text-xs font-black tracking-widest text-green-600 uppercase bg-green-100 px-3 py-1 rounded-full">
              Latest Highlights
            </span>
            <h2 id="news-heading" className="text-4xl font-black text-slate-900 tracking-tight mt-3">
              News & Key Developments
            </h2>
            <p className="mt-4 text-slate-500 text-lg font-medium">
              Discover the latest updates, achievements and partnerships from across our programmes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {homeNewsCards.map((card: any, idx: number) => (
              <article key={idx} className="group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="h-48 bg-slate-200 w-full overflow-hidden" aria-hidden="true">
                    {card.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-300 to-emerald-200"></div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-green-600 transition-colors leading-snug">
                      {card.title}
                    </h3>
                    {card.description && (
                      <p className="text-sm text-slate-500 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="p-8 pt-0">
                  <Link 
                    href={card.linkUrl || '/blog'}
                    className="inline-flex items-center gap-1 font-bold text-green-600 hover:text-green-700 transition-colors text-sm"
                  >
                    Learn More <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Modern Testimonial Section (Split layout instead of dark background) */}
        <section className="bg-white py-24 border-y border-slate-100" aria-labelledby="testimonial-heading">
          <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
            <h2 id="testimonial-heading" className="sr-only">Testimonial</h2>
            <div className="text-green-500 mb-6" aria-hidden="true">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
              "{testimonial ? testimonial.quote : 'The teaching provided by DA was inspirational, differentiated and well informed. The trainer built a strong, professional and appropriate relationship with each student.'}"
            </blockquote>
            <cite className="flex items-center gap-4 not-italic">
              <div className="w-12 h-12 bg-slate-200 rounded-full" aria-hidden="true"></div>
              <div className="text-left">
                <p className="font-bold text-slate-900">{testimonial ? testimonial.author : 'Paul Rogers'}</p>
                <p className="text-sm font-medium text-slate-500">{testimonial ? testimonial.role : 'North Ridge High School'}</p>
              </div>
            </cite>
          </div>
        </section>

      </main>

      {/* MODERN FOOTER */}
      <Footer settings={footerSettings} />
    </div>
  );
}
