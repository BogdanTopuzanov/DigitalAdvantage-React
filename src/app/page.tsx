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

  // Fetch global settings
  const settings = await client.fetch(`*[_type == "siteSettings"][0]`);

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
      <Header activePage="HOME" phoneNumber={settings?.phoneNumber} />

      {/* MAIN CONTENT */}
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        
        {/* Modern Hero Section */}
        <section className="relative bg-white overflow-hidden py-24 lg:py-32" aria-labelledby="hero-heading">
          {/* Decorative background blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 bg-gradient-to-r from-green-200 to-emerald-100 blur-3xl rounded-full pointer-events-none" aria-hidden="true"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 id="hero-heading" className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 mb-8 leading-tight">
              {settings?.heroTitle || (
                <>Hidden Talent <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Revealed</span></>
              )}
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto font-medium">
              Digital Advantage is a Manchester-based charity founded to help young people with Special Educational Needs and Disabilities (SEND) build the creative, digital and employability skills they need to thrive in the modern economy. We work with young people up to the age of 24, colleges and community settings across the Northwest, and through our Manchester city centre specialist college, DISC.
            </p>
            <p className="mt-6 text-lg font-bold text-slate-800 max-w-3xl mx-auto">
              Everything we do starts from the same belief: that neurodivergent and disabled young people have exceptional talent. Our job is to create the conditions in which that talent can flourish.
            </p>
          </div>
        </section>

        {/* Modern Cards Section */}
        <section className="py-20 bg-slate-50 relative" aria-labelledby="programs-heading">
          <div className="text-center mb-16 max-w-3xl mx-auto px-4">
            <h2 id="programs-heading" className="text-4xl font-black text-slate-900 tracking-tight">
              Just how do we reveal that talent?
            </h2>
            <p className="mt-4 text-slate-500 text-lg font-medium">
              There are 5 Digital Advantage programmes available, each designed to get the best out of young people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Card 1 */}
            <article className="group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden focus-within:ring-4 focus-within:ring-green-500 transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-slate-200 w-full" aria-hidden="true">
                {/* Image placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-200"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-slate-900">DISC</h3>
                <p className="text-slate-600 mb-8 line-clamp-4 text-sm leading-relaxed">
                  In September 2022 we opened our Digital Independent Specialist College (DISC), with partners SENDCode. Based in Manchester City Centre we established the UK's first Independent Specialist College.
                </p>
                <Link 
                  href="/disc" 
                  className="inline-block font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full px-6 py-3 transition-all"
                  aria-label="Learn more about DISC"
                >
                  Learn More
                </Link>
              </div>
            </article>

            {/* Card 2 */}
            <article className="group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden focus-within:ring-4 focus-within:ring-green-500 transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-slate-200 w-full" aria-hidden="true">
                <div className="w-full h-full bg-gradient-to-br from-indigo-300 to-purple-200"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-slate-900">PopUp Digital Agency</h3>
                <p className="text-slate-600 mb-8 line-clamp-4 text-sm leading-relaxed">
                  Delivered over 30 hours across 5 days, the PopUp Digital Agency is our flagship experiential learning programme giving young people experience of working in a realistic digital agency environment.
                </p>
                <Link 
                  href="/popup" 
                  className="inline-block font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full px-6 py-3 transition-all"
                  aria-label="Play Now for PopUp Digital Agency"
                >
                  Play Now
                </Link>
              </div>
            </article>

            {/* Card 3 */}
            <article className="group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden focus-within:ring-4 focus-within:ring-green-500 transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-slate-200 w-full" aria-hidden="true">
                <div className="w-full h-full bg-gradient-to-br from-amber-300 to-orange-200"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Digital Advantage Online</h3>
                <p className="text-slate-600 mb-8 line-clamp-4 text-sm leading-relaxed">
                  A series of digital skills workshops that can be delivered as part of our face-to-face training programmes, or more flexibly in shorter chunks to augment the national curriculum.
                </p>
                <Link 
                  href="/digital-advantage-online" 
                  className="inline-block font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full px-6 py-3 transition-all"
                  aria-label="Learn more about Digital Advantage Online"
                >
                  Learn More
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Sanity News Section */}
        <section className="py-20 bg-slate-50 border-t border-slate-100" aria-labelledby="news-heading">
          <div className="text-center mb-16 max-w-3xl mx-auto px-4">
            <h2 id="news-heading" className="text-4xl font-black text-slate-900 tracking-tight">
              Latest News from Sanity CMS
            </h2>
            <p className="mt-4 text-slate-500 text-lg font-medium">
              These articles are fetched live from the Sanity Content Lake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <p className="col-span-3 text-center text-slate-500 italic font-medium">No posts found. Go to /studio to create one!</p>
            ) : (
              posts.map((post: any) => (
                <article key={post._id} className="group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 bg-slate-200 w-full overflow-hidden" aria-hidden="true">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-300 to-emerald-200"></div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-4 text-slate-900">{post.title}</h3>
                    <Link 
                      href={`/blog`}
                      className="inline-block font-bold text-green-600 hover:text-green-700 transition-colors"
                    >
                      Read Article →
                    </Link>
                  </div>
                </article>
              ))
            )}
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
      <Footer settings={settings} />
    </div>
  );
}
