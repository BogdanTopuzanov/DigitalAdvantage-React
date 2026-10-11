import Link from 'next/link';

interface HeaderProps {
  activePage?: string;
  phoneNumber?: string;
}

export default function Header({ activePage = 'HOME', phoneNumber = '(0161) 410 2040' }: HeaderProps) {
  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'POPUP', href: '/popup' },
    { name: 'DISC', href: '/disc' },
    { name: 'VIDEOS', href: '/videos' },
    { name: 'BLOG', href: '/blog' },
    { name: 'CONTACT', href: '/contact-us' },
  ];

  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group focus:outline-none focus:ring-4 focus:ring-green-500 rounded-lg p-1 transition-all"
          aria-label="Digital Advantage Home"
        >
          {/* Real Green Logo */}
          <div className="w-10 h-10 flex-shrink-0 relative flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/logo-header.png" 
              alt="Digital Advantage" 
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-green-600 transition-colors">
            DIGITAL <span className="font-light text-slate-500">ADVANTAGE</span>
          </span>
        </Link>
        
        {/* Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:block">
          <ul className="flex space-x-1 items-center">
            {navLinks.map((link) => {
              const isActive = activePage.toUpperCase() === link.name;
              return (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className={`text-sm font-bold px-4 py-2 rounded-full transition-all focus:outline-none focus:ring-4 focus:ring-green-500 ${
                      isActive 
                        ? 'text-green-700 bg-green-100/70 shadow-sm' 
                        : 'text-slate-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            
            {/* Phone CTA */}
            <li className="pl-4 border-l border-slate-200">
              <a 
                href={`tel:${cleanPhone || '01614102040'}`}
                className="text-sm font-black text-slate-900 hover:text-green-600 focus:outline-none focus:ring-4 focus:ring-green-500 rounded-full px-3 py-2 transition-all flex items-center gap-2"
                aria-label={`Call us at ${phoneNumber}`}
              >
                📞 {phoneNumber}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
