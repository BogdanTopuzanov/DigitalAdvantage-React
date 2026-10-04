import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8FAFC] text-slate-800">
      {/* Skip to main content link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-6 py-3 z-[100] rounded-lg shadow-xl focus:ring-4 focus:ring-green-300 outline-none transition-all font-bold"
      >
        Skip to main content
      </a>

      {/* MODERN HEADER (Glassmorphism) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center gap-3">
            {/* Placeholder for the green logo */}
            <div className="w-10 h-10 bg-green-500 rounded-xl rounded-tr-none shadow-inner" aria-hidden="true"></div>
            <Link 
              href="/" 
              className="text-2xl font-black text-slate-900 tracking-tight hover:text-green-600 focus:outline-none focus:ring-4 focus:ring-green-500 rounded px-2 py-1 transition-colors"
              aria-label="Digital Advantage Home"
            >
              DIGITAL <span className="font-light text-slate-500">ADVANTAGE</span>
            </Link>
          </div>
          
          <nav aria-label="Main Navigation" className="hidden md:block">
            <ul className="flex space-x-2 items-center">
              {[
                { name: 'HOME', href: '/' },
                { name: 'POPUP', href: '/popup' },
                { name: 'DISC', href: '/disc' },
                { name: 'VIDEOS', href: '/videos' },
                { name: 'BLOG', href: '/blog' },
                { name: 'CONTACT', href: '/contact-us' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm font-bold text-slate-600 hover:text-green-600 hover:bg-green-50 focus:outline-none focus:ring-4 focus:ring-green-500 rounded-full px-5 py-2 transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pl-4 border-l border-slate-200">
                <a 
                  href="tel:01614102040" 
                  className="text-sm font-black text-slate-900 hover:text-green-600 focus:outline-none focus:ring-4 focus:ring-green-500 rounded-full px-3 py-2 transition-all flex items-center gap-2"
                  aria-label="Call us at (0161) 410 2040"
                >
                  📞 (0161) 410 2040
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        
        {/* Modern Hero Section */}
        <section className="relative bg-white overflow-hidden py-24 lg:py-32" aria-labelledby="hero-heading">
          {/* Decorative background blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 bg-gradient-to-r from-green-200 to-emerald-100 blur-3xl rounded-full pointer-events-none" aria-hidden="true"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 id="hero-heading" className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 mb-8 leading-tight">
              Hidden Talent <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Revealed</span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto font-medium">
              Digital Advantage is a charity established in 2020 to help young people with Special Educational Needs and Disabilities (SEND), gain creative, digital and core skills to help them into employment in the digital economy. We do this by providing strengths-based, experiential learning delivered by industry experts.
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
              "The teaching provided by DA was inspirational, differentiated and well informed. The trainer built a strong, professional and appropriate relationship with each student."
            </blockquote>
            <cite className="flex items-center gap-4 not-italic">
              <div className="w-12 h-12 bg-slate-200 rounded-full" aria-hidden="true"></div>
              <div className="text-left">
                <p className="font-bold text-slate-900">Paul Rogers</p>
                <p className="text-sm font-medium text-slate-500">North Ridge High School</p>
              </div>
            </cite>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-16" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Site Footer</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Quick Links */}
          <nav aria-label="Footer Navigation">
            <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'PopUp', 'DISC', 'Videos', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    href="#" 
                    className="text-slate-300 font-medium hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 rounded px-1 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Safeguarding */}
          <div>
            <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase mb-6">Safeguarding</h3>
            <p className="text-slate-300 mb-2 font-medium">Designated Safeguarding Lead: Caroline Dean</p>
            <a 
              href="mailto:caroline.d@disc.ac.uk" 
              className="text-green-400 font-bold hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 rounded px-1 transition-colors"
            >
              caroline.d@disc.ac.uk
            </a>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase mb-6">Contact Us</h3>
            <address className="not-italic text-slate-300 space-y-4 font-medium">
              <p>Holyoake House, Hanover Street<br/>Manchester, M4 4AH</p>
              <p>
                <a 
                  href="tel:01614102040" 
                  className="font-bold text-white hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 rounded px-1 transition-colors"
                >
                  (0161) 410 2040
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-slate-500">
          <p>Digital Advantage © All rights reserved.</p>
          <p className="mt-2 md:mt-0">Charity Number: 1188836</p>
        </div>
      </footer>
    </div>
  );
}
