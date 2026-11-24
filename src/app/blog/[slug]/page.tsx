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

  // 3. Fallback database with all authentic publications
  const fallbackArticles: Record<string, any> = {
    'your-dna-manchester': {
      title: 'Your DNA Manchester',
      categoryTitle: 'Careers & Outreach',
      authorName: 'Ezra Rushen',
      publishedAt: 'Wednesday, 28 May 2025',
      imageUrl: '/images/blog/your-dna-manchester.jpg',
      content: [
        "Your Digital News Agency Celebration: Showcasing Young Talent Across Greater Manchester",
        "On Friday 7th March, we marked another fantastic year of Your Digital News Agency (or Your DNA), our flagship outreach programme empowering young people to develop digital skills and creative confidence.",
        "The celebration event took place at Heron House, home to the Greater Manchester Digital Security Hub (DiSH), where students, trainers, and guests came together to reflect on a brilliant week of hard work and creativity.",
        "This year's programme involved 43 students from four schools and colleges across Greater Manchester, ranging from Year 9 to post-16. Each group spent a full week off-timetable working with one of Digital Advantage's expert industry trainers — Ashley Boroda, Rubbi Bhogal-Wood, Naomi Timperley, or Paul Holloway — to build their own multimedia-rich websites that proudly showcased life at their schools and colleges.",
        "From creating a project identity and designing a logo to generating original content, the students took ownership of every aspect of their digital newsroom. This year's cohort were also the first to trial our brand-new AI training resources, designed to teach responsible AI use, content ideation, and filmmaking techniques.",
        "We kicked off the celebration day with an engaging and interactive cybersecurity workshop delivered by James Darwent and James Livsey from Lancaster University, which got everyone thinking about the importance of staying safe online.",
        "After a delicious lunch provided by our generous hosts at DiSH, the group heard from Ezra Rushen about opportunities at DISC (Digital Independent Specialist College) — for many, a potential next step on their journey into creative and digital careers.",
        "We've been running Your DNA for over five years now, and we're always evolving the programme to make sure it stays relevant, inspiring and genuinely useful for the young people who take part. Every year we see confidence grow, new skills develop and friendships form.",
        "A huge thank you to all the schools, trainers, partners and hosts who made this year's Your DNA such a success.",
      ],
      tags: ['digital careers', 'Your DNA', 'Outreach', 'SEND'],
    },
    'digital-advantage-wins-gold-award': {
      title: 'Digital Advantage wins Gold Award',
      categoryTitle: 'Careers & Awards',
      authorName: 'Ezra Rushen',
      publishedAt: 'Thursday, 03 April 2025',
      imageUrl: '/images/blog/digital-advantage-wins-gold-award.jpg',
      content: [
        "Digital Advantage are proud to announce that they have recently been awarded the Neuro Diversity Employment Index (NDEI) Gold Award by Autistica, the UK's leading research-led campaigning organisation for Autism.",
        "The NDEI® is the only gold-standard evidence-based framework of its kind in the UK and we are immensely proud to be one of only a few Gold Award holders. The NDEI engages with management and employees and measures the organisation across three areas: Neurodiversity Management, Neuro Inclusion Management and Neuro Inclusion Landscape.",
        "Our aggregated score is 87 out of 100 which puts us right up there with some of the most progressive and diverse organisations in the UK.",
        "Our areas of strength included the adjustments and support we put in place for our employees; the pre-employment support including the job adverts we put in place and arrangements we make for applications, interviews and selection.",
        "And, whilst we are building a neuro inclusive culture, we can continue to make improvements by developing our social support, improving our interview practice and valuing the work of all our employees.",
        "We would encourage more companies to get involved with the NDEI and take steps to diversify their workforce. Unemployment for people with Autism is still running at an appalling rate of 71% and there are clear opportunities for companies to make a difference here by hiring more talented people on the Autistic spectrum.",
        "Every Autistic person is different and the work we do at Digital Advantage, DISC and SendCode is focussed on getting these incredible people the careers in the digital economy. If you'd like to find out how you can make a difference please get in touch with Andy@Digitaladvantage.org.uk for more information.",
      ],
      tags: ['Autism', 'NDEI', 'Neurodiversity', 'Awards'],
    },
    'digital-advantage-sendcode-disc': {
      title: 'Digital Advantage & SENDCode come together to deliver DISC',
      categoryTitle: 'DISC College & News',
      authorName: 'Andy Lovatt',
      publishedAt: 'Tuesday, 31 October 2023',
      imageUrl: '/images/blog/digital-advantage-sendcode-disc.jpg',
      content: [
        "We provide strengths-based, experiential learning delivered by industry and teaching professionals from diverse backgrounds. As well as DISC, we deliver fully funded programmes to around 30 special schools and colleges each year reaching about 300 young people and giving them skills and a line of sight to careers in the digital economy.",
        "These have been funded by GMCA, Careers and Enterprise Company, Local Authorities and grant-giving bodies such as the Access Foundation. Without this funding, many young people at school would have no opportunity to discover their hidden talents and realise their potential.",
        "Because we share the same goals, the same ethos and now many of the same personnel, it made sense to bring our two organisations together to better achieve these. We're working closely on a new structure and the re-organisation is almost complete.",
        "SENDCode has become a supported digital agency, doing paid work for clients and working with DISC graduates to deliver this. We're going to be better together and slowly grow our services so that we can help more Autistic young people into the careers they deserve.",
      ],
      tags: ['digital training', 'DISC', 'SENDCode'],
    },
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
        "This incredible project is a proud partnership between Digital Advantage, the students and staff of Oastlers School, and Bradford's West Indian Community Centre – Checkpoint.",
        "Digital Advantage was approached by Oastlers School in Bradford back in 2023 with the brief to make a podcast with their learners for Black History Month.",
        "Checkpoint Community Centre has a treasure trove of audio recordings made in the mid-1980s of people from the community who moved from the Caribbean to start a new life in Bradford in the 1950s and 1960s, talking about their experiences.",
        "For this episode the students were able to ask the questions first hand with our special guest, Gladstone Rowe. Gladstone left Jamaica for a new life in Bradford in 1960, he shared his personal experiences of the journey to start a new life and how he settled in to his new surroundings in Yorkshire.",
        "Talented local actor Shaun Thomas (Gerry Roberts, Emmerdale), also came into the school to see some of the creative writing students had created inspired by the project. Shaun has written a short play based on Checkpoint's audio recordings.",
        "The learners at both Oastlers Schools, in Keighley & Bradford, have skilfully embraced digital tools and developed crucial digital skills to create this podcast.",
        "You can subscribe or follow Echoes of the Caribbean on Spotify, Apple Podcasts or wherever you get your podcasts. Digital Advantage are investigating funding opportunities to continue this project over the next couple of years.",
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
        "Dylan originally joined the Digital Advantage as part of Digital Inc. internship in 2021. The course was transformational for him, building his digital skills, along with confidence and timekeeping.",
        "An asset to any company, Digital Advantage was keen to keep hold of Dylan and were delighted that the Co-op stepped forward to partially fund his 18 month long apprenticeship as part of our Digital Inc Agency.",
        "Dylan now works as a key part of the team creating digital projects and websites for real clients, such as Claritas Wealth and Manchester City Council.",
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
        "Digital Advantage is proud to announce that DISC, the Digital Independent Specialist College in Manchester, has celebrated completing it's first half term by welcoming ten new interns.",
        "They started their exciting journey in September, completing a four week induction, experimenting with digital photography, video, storyboarding, animation, graphics, scriptwriting, UX design, podcasting and web design.",
        "Be sure to follow their progress by following the @WeAreDISCmcr twitter account, as they work towards careers in the creative and digital economy.",
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
        "It charts the progress of Beck, one of our interns, who we first met at one of our Pop-Up Digital Agency deliveries, who has now gone on to further develop his skills at college.",
      ],
      tags: ['careers', 'digital careers', 'digital inc', 'SEND'],
    },
  };

  const article = post || fallbackArticles[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors">
      <Header activePage="BLOG" phoneNumber={headerSettings?.phoneNumber} />

      <main className="flex-grow py-12 sm:py-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 mb-8 transition-colors focus:outline-none focus:ring-4 focus:ring-green-500 rounded px-2 py-1"
          >
            ← Back to Blog
          </Link>

          {/* Article Header */}
          <header className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm mb-8 transition-colors">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-950/70 text-green-800 dark:text-green-300 font-bold text-xs uppercase tracking-wider rounded-full">
                {article.categoryTitle || 'Article'}
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                {article.publishedAt}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-geomanist-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm font-semibold text-slate-600 dark:text-slate-400">
              <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-800 dark:text-green-300 font-bold flex items-center justify-center">
                {(article.authorName || 'DA')[0]}
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-bold">{article.authorName || 'Digital Advantage'}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Author & Contributor</p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {(article.imageUrl || article.image || fallbackArticles[slug]?.imageUrl) && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.imageUrl || article.image || fallbackArticles[slug]?.imageUrl}
                alt={article.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm transition-colors">
            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {article.body ? (
                <PortableText value={article.body} />
              ) : (
                article.content?.map((para: string, i: number) => (
                  <p key={i} className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    {para}
                  </p>
                ))
              )}
            </div>

            {/* Tags */}
            {article.tags && (
              <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-2">Tags:</span>
                {article.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-full border border-slate-200/80 dark:border-slate-700"
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
              className="px-6 py-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
            >
              ← Back to Blog
            </Link>
            <Link
              href="/#main-content"
              className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-bold"
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
