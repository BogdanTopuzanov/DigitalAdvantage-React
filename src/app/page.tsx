import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const revalidate = 0; // Disable static caching so updates from Sanity appear instantly

export default async function Home() {
  // Fetch the latest testimonial from Sanity
  const testimonial = await client.fetch(`*[_type == "testimonial"] | order(_createdAt desc)[0]`);

  // Fetch settings from Sanity
  const headerSettings = await client.fetch('coalesce(*[_type == "headerSettings"][0], *[_type == "siteSettings"][0])');
  const footerSettings = await client.fetch('coalesce(*[_type == "footerSettings"][0], *[_type == "siteSettings"][0])');
  const homeSettings = await client.fetch(`coalesce(
    *[_type == "homePageSettings"] | order(_updatedAt desc)[0],
    *[_type == "siteSettings"][0]
  ) {
    heroTitle,
    heroSubtitle
  }`);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      {/* Skip to main content link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-6 py-3 z-[100] rounded-lg shadow-xl focus:ring-4 focus:ring-green-300 outline-none transition-all font-bold"
      >
        Skip to main content
      </a>

      {/* MODERN HEADER */}
      <Header activePage="HOME" phoneNumber={headerSettings?.phoneNumber} />

      {/* MAIN CONTENT - Clean editorial holding layout */}
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        
        {/* 1. HERO & MISSION */}
        <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24 border-b border-slate-100" aria-labelledby="hero-heading">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-25 bg-gradient-to-r from-green-200 to-emerald-100 blur-3xl rounded-full pointer-events-none" aria-hidden="true"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 id="hero-heading" className="font-geomanist text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-normal mb-8 leading-tight">
              {homeSettings?.heroTitle || (
                <>
                  Hidden Talent{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                    Revealed
                  </span>
                </>
              )}
            </h1>

            <p className="font-geomanist-regular text-lg sm:text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto font-normal">
              {homeSettings?.heroSubtitle || (
                <>
                  Digital Advantage is a Manchester-based charity founded to help young people with Special Educational Needs and Disabilities (SEND) build the creative, digital and employability skills they need to thrive in the modern economy. We work with young people up to the age of 24, schools, colleges and community settings across the North West, and through our Manchester city centre specialist college, DISC.
                </>
              )}
            </p>

            <div className="mt-10 p-6 sm:p-8 bg-slate-50 border-l-4 border-green-500 rounded-r-2xl text-left max-w-3xl mx-auto shadow-xs">
              <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
                Everything we do starts from the same belief: that neurodivergent and disabled young people have exceptional talent. Our job is to create the conditions in which that talent can flourish.
              </p>
            </div>
          </div>
        </section>

        {/* 2. WHAT WE DO */}
        <section className="py-16 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="what-we-do-heading">
          <div className="max-w-3xl">
            <span className="text-xs font-black tracking-widest text-green-700 uppercase bg-green-100 px-3 py-1 rounded-full inline-block mb-3">
              Provisions & Delivery
            </span>
            <h2 id="what-we-do-heading" className="font-geomanist text-3xl sm:text-4xl font-black text-slate-900 tracking-normal">
              What We Do
            </h2>
          </div>

          <div className="mt-12 space-y-16">
            {/* DISC Provision */}
            <div className="border-b border-slate-100 pb-12">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                <h3 className="text-2xl font-black text-slate-900">
                  DISC - Digital Independent Specialist College
                </h3>
                <ExternalLink 
                  href="https://disc.ac.uk/" 
              
                  className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors inline-flex items-center gap-1"
                >
                  Visit disc.ac.uk <span aria-hidden="true">↗</span>
                </ExternalLink>
              </div>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                DISC is the provision at the heart of Digital Advantage. Based in Manchester city centre, DISC offers flexible, specialist education and supported employment pathways for young people aged 16 to 24 with an Education, Health and Care Plan (EHCP). DISC is registered with the Department for Education as an Independent Specialist College and is subject to Ofsted inspection.
              </p>

              <div className="bg-slate-50 rounded-2xl p-6 mb-6">
                <h4 className="text-xs font-black tracking-widest text-slate-500 uppercase mb-3">
                  Programmes Include
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <li className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Alternative Provision
                  </li>
                  <li className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Pre-Internship Programme
                  </li>
                  <li className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Supported Internship
                  </li>
                </ul>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                All DISC programmes are funded through Education, Health and Care Plans commissioned by local authorities. To refer a young person or make an enquiry, contact:{" "}
                <a href="mailto:clare.o@disc.ac.uk" className="font-bold text-green-700 hover:underline">
                  clare.o@disc.ac.uk
                </a>
              </p>
            </div>

            {/* Outreach Programmes */}
            <div className="border-b border-slate-100 pb-12">
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                Outreach Programmes
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                We deliver funded digital skills programmes directly into schools and colleges across Greater Manchester, Lancashire, Cheshire, West Yorkshire and beyond. Our outreach work is commissioned by local authorities, combined authorities and regional skills partnerships.
              </p>

              <div className="bg-slate-50 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Your DNA (Your Digital News Agency)
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    An intensive and transformative digital work experience programme.
                  </p>
                </div>
                <Link 
                  href="/blog/your-dna" 
                  className="inline-flex items-center gap-2 font-bold text-sm bg-white border border-slate-200 px-4 py-2 rounded-lg text-green-700 hover:border-green-400 hover:shadow-xs transition-all shrink-0"
                >
                  See the Your DNA showcase <span aria-hidden="true">→</span>
                </Link>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                All outreach programmes require appropriate funding to be in place prior to delivery. To discuss a commission or partnership, contact us at:{" "}
                <a href="mailto:hello@digitaladvantage.org.uk" className="font-bold text-green-700 hover:underline">
                  hello@digitaladvantage.org.uk
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* 3. OUR REACH & AWARDS */}
        <section className="py-16 bg-slate-50 border-y border-slate-100" aria-labelledby="reach-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black tracking-widest text-green-700 uppercase bg-green-100 px-3 py-1 rounded-full inline-block mb-3">
                Impact & Recognition
              </span>
              <h2 id="reach-heading" className="font-geomanist text-3xl sm:text-4xl font-black text-slate-900 tracking-normal">
                Our Reach
              </h2>
              <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                Since 2014, Digital Advantage has worked with thousands of young people across the North West and beyond. Our long-term funded partnerships include Lancashire County Council and Greater Manchester Combined Authority. We hold the Neurodiversity Employment Index (NDEI) Gold Award from Autistica, the UK&apos;s leading autism research and campaigning organisation.
              </p>
            </div>

            {/* Recognition Badges */}
            <div className="pt-6">
              <h3 className="text-xs font-black tracking-widest text-slate-500 uppercase mb-4">
                Recognition and Accreditations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500 shrink-0"></span>
                  <span className="font-bold text-sm text-slate-800">Ofsted Good Provider</span>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500 shrink-0"></span>
                  <span className="font-bold text-sm text-slate-800">Natspec Innovative Routes to Employment Award 2025</span>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500 shrink-0"></span>
                  <span className="font-bold text-sm text-slate-800">Autistica NDEI Gold Award</span>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500 shrink-0"></span>
                  <span className="font-bold text-sm text-slate-800">Cyber Essentials Plus Certified</span>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500 shrink-0"></span>
                  <span className="font-bold text-sm text-slate-800">GM Skills Awards 2026 (Shortlisted)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. GOVERNANCE, SAFEGUARDING & POLICIES */}
        <section className="py-16 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="governance-heading">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Governance */}
            <div>
              <h2 id="governance-heading" className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                Governance & Accountability
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4">
                Digital Advantage is a registered charity in England and Wales (Registered Charity No. <strong>1188836</strong>).
              </p>
              <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4">
                Our trustees&apos; annual report and accounts are filed with and publicly available from the Charity Commission for England and Wales at the{" "}
                <ExternalLink 
                  href="https://register-of-charities.charitycommission.gov.uk/" 
                  className="font-bold text-green-700 hover:underline"
                >
                  Register of Charities
                </ExternalLink>.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Board details are available on request:{" "}
                <a href="mailto:hello@digitaladvantage.org.uk" className="font-bold text-green-700 hover:underline">
                  hello@digitaladvantage.org.uk
                </a>
              </p>
            </div>

            {/* Safeguarding */}
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                Safeguarding
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4">
                The safety and welfare of all children and young people in our programmes is our highest priority. Digital Advantage operates a comprehensive safeguarding policy in line with statutory guidance and funder requirements.
              </p>
              <p className="text-sm text-slate-700 font-bold mb-4">
                Designated Safeguarding Lead: Caroline Dean (
                <a href="mailto:caroline.d@disc.ac.uk" className="text-green-700 hover:underline font-bold">
                  caroline.d@disc.ac.uk
                </a>)
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href="#" 
                  className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  📄 Download DA Safeguarding Policy
                </a>
                <a 
                  href="#" 
                  className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  📄 Download DISC Safeguarding Policy
                </a>
              </div>
            </div>

          </div>

          {/* Compliance & Standards (Accessibility, Privacy, Complaints) */}
          <div className="mt-16 pt-12 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Accessibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                We are committed to full accessibility, targeting WCAG 2.2 AA standards. If you encounter any access difficulties, please contact{" "}
                <a href="mailto:hello@digitaladvantage.org.uk" className="text-green-700 hover:underline">
                  hello@digitaladvantage.org.uk
                </a>.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Privacy & GDPR</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Registered with the ICO as a data controller. All personal data is processed in accordance with UK GDPR and the Data Protection Act 2018. Full privacy policy available on request.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Complaints Procedure</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Complaints are acknowledged within 5 working days and aimed to be resolved within 20 days. Formal educational complaints follow DISC procedures.
              </p>
            </div>
          </div>
        </section>

        {/* 5. SUBTLE TESTIMONIAL QUOTE */}
        {testimonial && (
          <section className="bg-white py-16 border-t border-slate-100" aria-label="Partner Testimonial">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <blockquote className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <cite className="not-italic text-sm text-slate-500 font-medium">
                <span className="font-bold text-slate-800">{testimonial.author}</span>
                {testimonial.role ? ` - ${testimonial.role}` : ""}
              </cite>
            </div>
          </section>
        )}

      </main>

      {/* MODERN FOOTER */}
      <Footer settings={footerSettings} />
    </div>
  );
}
