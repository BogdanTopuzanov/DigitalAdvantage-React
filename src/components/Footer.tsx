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
  // 1. Fallback for Quick Links
  const defaultQuickLinks: FooterItem[] = [
    { text: 'Home', url: '/', isLink: true },
    { text: 'PopUp', url: '/popup', isLink: true },
    { text: 'DISC', url: '/disc', isLink: true },
    { text: 'Videos', url: '/videos', isLink: true },
    { text: 'Blog', url: '/blog', isLink: true },
    { text: 'Contact', url: '/contact-us', isLink: true },
  ];

  // 2. Fallback for Safeguarding
  const defaultSafeguarding: FooterItem[] = [
    { text: 'Designated Safeguarding Lead: Caroline Dean', isLink: false },
    { 
      text: settings?.email || 'caroline.d@disc.ac.uk', 
      url: `mailto:${settings?.email || 'caroline.d@disc.ac.uk'}`, 
      isLink: true 
    },
    { text: 'Download Safeguarding Policy (PDF)', url: '#', isLink: true },
  ];

  // 3. Fallback for Contact
  const defaultContact: FooterItem[] = [
    { text: 'Holyoake House, Hanover Street', isLink: false },
    { text: 'Manchester, M4 4AH', isLink: false },
    { 
      text: settings?.phoneNumber || '(0161) 410 2040', 
      url: `tel:${(settings?.phoneNumber || '01614102040').replace(/[^0-9+]/g, '')}`, 
      isLink: true 
    },
  ];

  const quickLinks = (settings?.footerQuickLinks && settings.footerQuickLinks.length > 0) 
    ? settings.footerQuickLinks 
    : defaultQuickLinks;

  const safeguarding = (settings?.footerSafeguarding && settings.footerSafeguarding.length > 0) 
    ? settings.footerSafeguarding 
    : defaultSafeguarding;

  const contact = (settings?.footerContact && settings.footerContact.length > 0) 
    ? settings.footerContact 
    : defaultContact;

  // Helper renderer for a single footer line
  const renderItem = (item: FooterItem, idx: number) => {
    if (item.isLink && item.url) {
      const isExternal = item.url.startsWith('http') || item.url.startsWith('mailto:') || item.url.startsWith('tel:');
      if (isExternal) {
        return (
          <li key={idx}>
            <a 
              href={item.url}
              className="text-slate-300 font-medium hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 rounded px-1 transition-colors inline-block"
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
            className="text-slate-300 font-medium hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 rounded px-1 transition-colors inline-block"
          >
            {item.text}
          </Link>
        </li>
      );
    }

    return (
      <li key={idx} className="text-slate-300 font-medium leading-relaxed">
        {item.text}
      </li>
    );
  };

  return (
    <footer className="bg-slate-900 text-white py-16 border-t border-slate-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Site Footer</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand Logo & Mission */}
          <div className="flex flex-col items-start space-y-4">
            <Link href="/" className="inline-block group focus:outline-none focus:ring-4 focus:ring-green-500 rounded p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/logo-footer.png" 
                alt="Digital Advantage Logo" 
                className="h-20 sm:h-24 w-auto max-w-[280px] object-contain group-hover:brightness-110 transition-all -ml-1"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {settings?.footerAbout || 'Digital Advantage is a registered charity in England and Wales. We help young neurodivergent people and individuals with SEND gain creative, digital and employability skills.'}
            </p>
            <span className="inline-block px-3 py-1 bg-slate-800 border border-slate-700/60 rounded-full text-xs font-semibold text-green-400">
              Registered Charity No. 1188836
            </span>
          </div>

          {/* Column 2: Quick Links */}
          <nav aria-label="Footer Navigation">
            <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(renderItem)}
            </ul>
          </nav>

          {/* Column 3: Safeguarding */}
          <div>
            <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Safeguarding
            </h3>
            <ul className="space-y-3">
              {safeguarding.map(renderItem)}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Contact Us
            </h3>
            <ul className="space-y-3">
              {contact.map(renderItem)}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-sm font-medium text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Digital Advantage. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/accessibility" className="hover:text-slate-400 transition-colors">Accessibility</Link>
            <Link href="/contact-us" className="hover:text-slate-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
