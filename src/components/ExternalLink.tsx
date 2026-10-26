"use client";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ExternalLink({
  href,
  children,
  className,
}: ExternalLinkProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const confirmed = window.confirm(
      "You are leaving the Digital Advantage website and visiting an external website. Continue?"
    );

    if (!confirmed) {
      e.preventDefault();
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}