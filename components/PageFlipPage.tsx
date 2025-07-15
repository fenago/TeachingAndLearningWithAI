import React from 'react';

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

const PageFlipPage = React.forwardRef<HTMLDivElement, PageProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div className={`page ${className}`} ref={ref}>
        {children}
      </div>
    );
  }
);

PageFlipPage.displayName = 'PageFlipPage';

export default PageFlipPage;
