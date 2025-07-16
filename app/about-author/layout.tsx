import { getSEOTags } from '@/libs/seo';

// Enhanced SEO metadata for Dr. Ernesto Lee's About page
export const metadata = getSEOTags({
  title: "About Dr. Ernesto Lee | Educational AI Researcher | LearningScience.io",
  description: "Meet Dr. Ernesto Lee, leading expert in productive struggle methodology and AI-enhanced education. Stanford-educated researcher, author, and pioneer in research-based AI teaching approaches for K-12 and college educators.",
  canonicalUrlRelative: "/about-author",
  keywords: [
    "Dr. Ernesto Lee",
    "educational AI researcher", 
    "productive struggle methodology",
    "AI education expert",
    "Stanford education",
    "teacher training AI",
    "educational technology researcher",
    "learning science",
    "AI teaching methodology"
  ],
  openGraph: {
    title: "Dr. Ernesto Lee - Educational AI Research Pioneer",
    description: "Leading expert in productive struggle methodology and AI-enhanced education. Author of research-based approaches to teaching with AI.",
    images: [
      {
        url: "/images/dr-ernesto-lee-og.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Ernesto Lee - Educational AI Researcher"
      }
    ]
  }
});

export default function AboutAuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
