import Link from 'next/link';

export interface FooterItem {
  text: string;
  isLink?: boolean;
  url?: string;
}

interface FooterProps {
  settings?: {
    email?: string;
    phoneNumber?: string;
    footerAbout?: string;
    footerQuickLinks?: FooterItem[];
    footerSafeguarding?: FooterItem[];
    footerContact?: FooterItem[];
  };
}

export default function Footer({ settings }: FooterProps) {
  // Routes that do not exist yet — render them as inactive (non-clickable) during beta
  const disabledRoutes = new Set(['/disc', '/videos', '/accessibility', '/contact-us', '/popup', '/pop-up']);

  const isDisabled = (item: FooterItem) =>
    !!item.url && !item.url.startsWith('http') && !item.url.startsWith('mailto:') && !item.url.startsWith('tel:') && disabledRoutes.has(item.url);

  // 1. Fallback for Quick Links
  const defaultQuickLinks: FooterItem[] = [
    { text: 'Home', url: '/', isLink: true },
    { text: 'DISC', url: '/disc', isLink: true },
    { text: 'Videos', url: '/videos', isLink: true },
    { text: 'Blog', url: '/blog', isLink: true },
  ];

  // 2. Fallback for Safeguarding
  const defaultSafeguarding: FooterItem[] = [
    { text: 'Designated Safeguarding Lead: Caroline Dean', isLink: false },
    { 
      text: settings?.email || 'caroline.d@disc.ac.uk', 
      url: `mailto:${settings?.email || 'caroline.d@disc.ac.uk'}`, 
      isLink: true 
    },
    { text: 'Download Safeguarding Policy (PDF)', url: 'https://disc.ac.uk/wp-content/uploads/2026/10/DISC-Safeguarding-Policy-September-2026-v3.pdf', isLink: true },
  ];

  // 3. Fallback for Contact
  const defaultContact: FooterItem[] = [
    { text: 'hello@digitaladvantage.org.uk', url: 'mailto:hello@digitaladvantage.org.uk', isLink: true },
    { text: 'Holyoake House, Hanover Street', isLink: false },
    { text: 'Manchester, M4 4AH', isLink: false },
    { 
      text: settings?.phoneNumber || '(0161) 410 2040', 
      url: `tel:${(settings?.phoneNumber || '01614102040').replace(/[^0-9+]/g, '')}`, 
      isLink: true 
    },
  ];

  const quickLinksRaw = (settings?.footerQuickLinks && settings.footerQuickLinks.length > 0) 
    ? settings.footerQuickLinks 
    : defaultQuickLinks;

  // Always drop PopUp and Contact from Quick Links (regardless of CMS data)
  const quickLinks = quickLinksRaw.filter(
    (item) => !['PopUp', 'Contact'].includes(item.text.trim())
  );

  const safeguarding = (settings?.footerSafeguarding && settings.footerSafeguarding.length > 0) 
    ? settings.footerSafeguarding 
    : defaultSafeguarding;

  const contact = (settings?.footerContact && settings.footerContact.length > 0) 
    ? settings.footerContact 
    : defaultContact;

  // Helper renderer for a single footer line
  const renderItem = (item: FooterItem, idx: number) => {
    if (item.isLink && item.url) {
      // Inactive (non-clickable) item for routes that don't exist yet
      if (isDisabled(item)) {
        return (
          <li key={idx}>
            <span
              aria-disabled="true"
              title="Coming soon"
              className="text-white/45 dark:text-slate-900/45 font-medium cursor-not-allowed select-none"
            >
              {item.text}
            </span>
          </li>
        );
      }
      const isExternal = item.url.startsWith('http') || item.url.startsWith('mailto:') || item.url.startsWith('tel:');
      if (isExternal) {
        return (
          <li key={idx}>
            <a 
              href={item.url}
              target={isExternal && item.url.startsWith('http') ? '_blank' : undefined}
              rel={isExternal && item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-white dark:text-slate-900 font-medium hover:text-green-400 dark:hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400 focus-visible:ring-offset-[#3A3A3A] dark:focus-visible:ring-offset-[#F7F9F7] rounded px-1 transition-colors inline-block"
            >
              {item.text}
            </a>
          </li>
        );
      }
      return (
        <li key={idx}>
          <Link 
            href={item.url}
            className="text-white dark:text-slate-900 font-medium hover:text-green-400 dark:hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400 focus-visible:ring-offset-[#3A3A3A] dark:focus-visible:ring-offset-[#F7F9F7] rounded px-1 transition-colors inline-block"
          >
            {item.text}
          </Link>
        </li>
      );
    }

    return (
      <li key={idx} className="text-white dark:text-slate-900 font-medium leading-relaxed">
        {item.text}
      </li>
    );
  };

  return (
    <footer className="bg-[#3A3A3A] dark:bg-[#F7F9F7] text-white dark:text-slate-900 py-16 border-t border-slate-800 dark:border-slate-200 transition-colors" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Site Footer</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand Logo & Mission (4 columns) */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <Link href="/" className="inline-block group focus:outline-none focus:ring-4 focus:ring-green-500 rounded p-1">
              {/* Light logo: white text + green symbol on dark bg */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/logo-footer.png" 
                alt="Digital Advantage Logo" 
                className="h-7 sm:h-10 w-auto max-w-full object-contain group-hover:brightness-110 transition-all dark:hidden"
              />
              {/* Dark logo: dark text + green symbol on light bg */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/Logo-Footer-Green+Grey-Fine.svg" 
                alt="Digital Advantage Logo" 
                className="h-7 sm:h-10 w-auto max-w-full object-contain transition-all hidden dark:block"
              />
            </Link>
            <p className="text-sm text-white dark:text-slate-900 leading-relaxed max-w-xs sm:max-w-sm">
              {settings?.footerAbout || 'Digital Advantage is a registered charity in England and Wales. We help young neurodivergent people and individuals with SEND gain creative, digital and employability skills.'}
            </p>
            <p className="text-sm text-white dark:text-slate-900 font-medium">
              Registered Charity No. 1188836
            </p>
          </div>

          {/* Column 2: Quick Links (2 columns) */}
          <nav aria-label="Footer Navigation" className="lg:col-span-2">
            <h3 className="text-sm font-black tracking-widest text-white dark:text-slate-900 uppercase mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(renderItem)}
            </ul>
          </nav>

          {/* Column 3: Safeguarding (3 columns) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-black tracking-widest text-white dark:text-slate-900 uppercase mb-6">
              Safeguarding
            </h3>
            <ul className="space-y-3">
              {safeguarding.map(renderItem)}
            </ul>
          </div>

          {/* Column 4: Contact Us (3 columns) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-black tracking-widest text-white dark:text-slate-900 uppercase mb-6">
              Contact Us
            </h3>
            <ul className="space-y-3">
              {contact.map(renderItem)}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 dark:border-slate-300/60 flex flex-col sm:flex-row justify-between items-center text-sm font-medium text-white dark:text-slate-900 gap-4">
          <p>© {new Date().getFullYear()} Digital Advantage. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://disc.ac.uk/wp-content/uploads/2026/10/DISC-Safeguarding-Policy-September-2026-v3.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 dark:hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400 focus-visible:ring-offset-[#3A3A3A] dark:focus-visible:ring-offset-[#F7F9F7] rounded transition-colors">Privacy Policy</a>
            <span aria-disabled="true" title="Coming soon" className="text-white/45 dark:text-slate-900/45 cursor-not-allowed select-none">Accessibility</span>
            <Link href="/" className="hover:text-green-400 dark:hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400 focus-visible:ring-offset-[#3A3A3A] dark:focus-visible:ring-offset-[#F7F9F7] rounded transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
