import Link from 'next/link';
import ExternalLink from "./ExternalLink";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  activePage?: string;
  phoneNumber?: string;
}

export default function Header({ activePage = 'HOME', phoneNumber = '(0161) 410 2040' }: HeaderProps) {
  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "DISC", href: "https://disc.ac.uk/" },
    { label: "BLOG", href: "/blog" },
  ];

  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#020617]/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link
          href="/" 
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#020617] rounded-lg p-1 transition-all"
          aria-label="Digital Advantage Home"
        >
          <div className="w-48 h-16 flex-shrink-0 relative flex items-center justify-center">
            {/* Light logo: dark text + green symbol on light bg */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/Logo-Footer-Green+Grey-Fine.svg" 
              alt="Digital Advantage" 
              className="w-48 h-16 object-contain group-hover:scale-105 transition-transform dark:hidden"
            />
            {/* Dark logo: white text + green symbol on dark bg */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/logo-footer.png" 
              alt="Digital Advantage" 
              className="w-48 h-16 object-contain group-hover:scale-105 transition-transform hidden dark:block"
            />
          </div>
        </Link>
        
        {/* Navigation + Actions */}
        <div className="flex items-center gap-2">
          <nav aria-label="Main Navigation" className="hidden md:block">
            <ul className="flex space-x-1 items-center">
              {navLinks.map((link) => {
                const isActive = activePage.toUpperCase() === link.label;
                return (
                  <li key={link.label}>
                    {link.label === "DISC" ? (
                      <ExternalLink
                        href="https://disc.ac.uk/"
                        className={`text-sm font-bold px-5 py-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-green-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#020617] ${
                          isActive
                            ? "bg-green-600 text-white shadow-md shadow-green-600/30 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                            : "bg-green-100 text-green-800 hover:bg-green-600 hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-green-500"
                        }`}
                      >
                        DISC
                      </ExternalLink>
                    ) : (
                      <Link
                        href={link.href}
                        className={`text-sm font-bold px-5 py-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-green-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#020617] ${
                          isActive
                            ? "bg-green-600 text-white shadow-md shadow-green-600/30 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                            : "bg-green-100 text-green-800 hover:bg-green-600 hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-green-500"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
              
              {/* Phone CTA */}
              <li className="pl-4 border-l border-slate-200 dark:border-slate-700">
                <a 
                  href={`tel:${cleanPhone || '01614102040'}`}
                  className="text-sm font-black text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 shadow-md shadow-green-600/30 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-green-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#020617] rounded-full px-5 py-2.5 transition-all flex items-center gap-2"
                  aria-label={`Call us at ${phoneNumber}`}
                >
                  <svg 
                    className="w-4 h-4 text-white shrink-0" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    aria-hidden="true"
                  >
                    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>{phoneNumber}</span>
                </a>
              </li>

              {/* Theme Toggle — right of phone number */}
              <li className="pl-1">
                <ThemeToggle />
              </li>
            </ul>
          </nav>

          {/* Theme Toggle for mobile */}
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>

      </div>
    </header>
  );
}
