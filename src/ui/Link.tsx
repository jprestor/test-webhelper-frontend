import NextLink from 'next/link';

export function Link({
  to,
  scroll,
  target,
  title,
  onClick,
  tabIndex,
  children,
  className,
}: {
  to?: string;
  scroll?: boolean;
  target?: string;
  title?: string;
  onClick?: any;
  children?: React.ReactNode;
  tabIndex?: number;
  className?: string;
}) {
  if (!to) {
    return (
      <a
        className={className}
        target={target}
        title={title}
        tabIndex={tabIndex}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      className={className}
      href={to}
      scroll={scroll}
      target={target}
      title={title}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {children}
    </NextLink>
  );
}
