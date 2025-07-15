import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chapter 1: The Friction Paradox - AI and the Art of Productive Struggle',
  description: 'Read Chapter 1 of AI and the Art of Productive Struggle by Dr. Ernesto Lee. Discover why AI\'s greatest gift to education isn\'t what you think.',
  openGraph: {
    title: 'Chapter 1: The Friction Paradox',
    description: 'Experience the revolutionary approach to AI in education through an interactive page flip preview.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chapter 1: The Friction Paradox',
    description: 'Read Chapter 1 of AI and the Art of Productive Struggle',
  },
};

export default function Chapter1PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
