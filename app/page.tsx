import { Suspense, ReactNode } from 'react';

import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import ChapterShowcase from "@/components/ChapterShowcase";
import SocialProof from "@/components/SocialProof";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import CustomFooter from "@/components/CustomFooter";
import { Metadata } from 'next';

// Add metadata for SEO
export const metadata: Metadata = {
  title: 'FeNAgO - Agentic AI SaaS Platform Template',
  description: 'The complete platform for building agentic AI-powered SaaS products—ideal for students, developers, startups, and entrepreneurs looking to innovate rapidly. In the near future, every traditional SaaS application will inevitably be surpassed by an Agentic SaaS solution, redefining the competitive landscape.',
  keywords: 'agentic AI, SaaS template, AI platform, DrLee, AI development, FeNAgO, AI startup',
};

export default function Home(): JSX.Element {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        
      </Suspense>
      <main>
        {/* FeNAgO - The complete platform for building agentic AI-powered SaaS products */}
        <Hero />
        <Problem />
        <ChapterShowcase />
        <SocialProof />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <CustomFooter />
    </>
  );
}
