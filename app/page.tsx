import { Suspense } from 'react';
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import ChapterShowcase from "@/components/ChapterShowcase";
import SocialProof from "@/components/SocialProof";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import CustomFooter from "@/components/CustomFooter";

// Enhanced SEO metadata for LearningScience.io homepage
export const metadata = getSEOTags({
  title: "Transform Teaching with AI | LearningScience.io",
  description: "Discover productive struggle methodology - the research-based approach that helps K-12 and college educators harness AI's power while preserving meaningful learning. Transform your teaching today.",
  canonicalUrlRelative: "/",
  keywords: [
    "AI in education", 
    "productive struggle", 
    "teaching with AI", 
    "AI tutoring tools", 
    "research-based education", 
    "K-12 AI tools", 
    "college teaching AI", 
    "educational technology",
    "Dr. Ernesto Lee",
    "AI teaching methodology"
  ],
});

export default function Home(): JSX.Element {
  return (
    <>
      {/* Educational Organization Structured Data */}
      {renderSchemaTags()}
      
      <Suspense fallback={<div>Loading...</div>}>
        
      </Suspense>
      <main>
        {/* LearningScience.ai - Transform teaching with AI-enhanced productive struggle */}
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
