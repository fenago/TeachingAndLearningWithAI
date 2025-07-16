import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import Link from 'next/link';
import { BookOpen, Video, FileText, Users, Download, ExternalLink, Clock, Target } from 'lucide-react';

// Enhanced SEO metadata for Resources page
export const metadata = getSEOTags({
  title: "Free AI Teaching Resources | Educator Tools & Guides | LearningScience.io",
  description: "Access free research-based resources for implementing AI in education. Download practical guides, templates, and tools designed specifically for K-12 and college educators using productive struggle methodology.",
  canonicalUrlRelative: "/resources",
  keywords: [
    "free AI teaching resources",
    "educator AI tools",
    "productive struggle resources",
    "AI education guides",
    "teacher AI templates",
    "K-12 AI resources",
    "college AI teaching tools",
    "educational technology downloads",
    "Dr. Ernesto Lee resources"
  ],
  openGraph: {
    title: "Free AI Teaching Resources for Educators",
    description: "Research-based tools and guides for implementing productive struggle methodology with AI in your classroom.",
    images: [
      {
        url: "/images/resources-og.jpg",
        width: 1200,
        height: 630,
        alt: "Free AI Teaching Resources for Educators"
      }
    ]
  }
});

// Resources schema for educational materials
const resourcesSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": "https://learningscience.io/resources#educational-resources",
  name: "AI Teaching Resources Collection",
  description: "Comprehensive collection of research-based educational resources for implementing productive struggle methodology with AI tools",
  author: {
    "@type": "Person",
    name: "Dr. Ernesto Lee",
    jobTitle: "Educational AI Researcher"
  },
  publisher: {
    "@type": "EducationalOrganization",
    name: "LearningScience.io"
  },
  audience: {
    "@type": "EducationalAudience",
    audienceType: ["K-12 Teachers", "College Faculty", "Educational Leaders"]
  },
  educationalLevel: "Professional Development",
  about: [
    "Artificial Intelligence in Education",
    "Productive Struggle Methodology",
    "Teaching with AI Tools",
    "Educational Technology"
  ],
  accessMode: ["textual", "visual"],
  accessibilityFeature: ["readingOrder", "structuralNavigation"],
  license: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
};

interface Resource {
  title: string;
  description: string;
  type: 'guide' | 'template' | 'video' | 'webinar';
  level: 'K-12' | 'College' | 'Both';
  duration: string;
  downloadUrl?: string;
  externalUrl?: string;
  icon: any;
}

const resources: Resource[] = [
  {
    title: "Productive Struggle Implementation Guide",
    description: "Step-by-step guide for introducing productive struggle methodology in your classroom, with practical examples and assessment strategies.",
    type: "guide",
    level: "Both",
    duration: "30 min read",
    downloadUrl: "/downloads/productive-struggle-guide.pdf",
    icon: BookOpen
  },
  {
    title: "AI Tool Evaluation Framework",
    description: "Comprehensive framework for evaluating AI tools based on their impact on productive struggle and learning outcomes.",
    type: "template", 
    level: "Both",
    duration: "15 min setup",
    downloadUrl: "/downloads/ai-tool-evaluation-template.pdf",
    icon: Target
  },
  {
    title: "Getting Started with AI Tutoring Tools",
    description: "Introduction to AI tutoring platforms and how to use them while maintaining cognitive challenge for students.",
    type: "video",
    level: "Both", 
    duration: "25 min watch",
    externalUrl: "https://youtube.com/watch?v=example",
    icon: Video
  },
  {
    title: "Lesson Plan Templates for AI Integration",
    description: "Ready-to-use lesson plan templates that incorporate AI tools while preserving productive struggle elements.",
    type: "template",
    level: "K-12",
    duration: "10 min setup",
    downloadUrl: "/downloads/ai-lesson-templates.zip",
    icon: FileText
  },
  {
    title: "Assessment Strategies in the AI Era",
    description: "Practical approaches to authentic assessment that account for AI availability while measuring real learning.",
    type: "guide",
    level: "Both",
    duration: "20 min read", 
    downloadUrl: "/downloads/ai-assessment-strategies.pdf",
    icon: BookOpen
  },
  {
    title: "Building AI Literacy in Students",
    description: "Strategies for teaching students how to use AI as a learning tool rather than a shortcut to answers.",
    type: "webinar",
    level: "Both",
    duration: "45 min watch",
    externalUrl: "/webinars/ai-literacy-building",
    icon: Users
  }
];

export default function ResourcesPage() {
  return (
    <>
      {/* Resources Structured Data */}
      {renderSchemaTags(resourcesSchema)}
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-20 lg:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Free Resources for 
                <span className="block text-yellow-300">AI-Enhanced Teaching</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Research-based tools, guides, and templates to help you implement productive 
                struggle methodology with AI in your classroom—completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="#resources" 
                  className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors inline-flex items-center gap-2"
                >
                  Browse Resources <Download className="w-5 h-5" />
                </Link>
                <Link 
                  href="/workshops" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  View Workshops
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why These Resources Work</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Every resource is grounded in educational research and designed to preserve the 
                cognitive effort essential for meaningful learning.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Research-Based</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every tool and strategy is backed by peer-reviewed educational research.
                </p>
              </div>
              
              <div className="text-center p-6">
                <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Immediately Practical</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Ready-to-use templates and guides you can implement in your classroom today.
                </p>
              </div>
              
              <div className="text-center p-6">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Educator-Tested</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Developed and refined by practicing educators across diverse classroom settings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section id="resources" className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Resources</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Choose from guides, templates, videos, and webinars tailored to your needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0">
                          <IconComponent className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              resource.type === 'guide' ? 'bg-blue-100 text-blue-800' :
                              resource.type === 'template' ? 'bg-green-100 text-green-800' :
                              resource.type === 'video' ? 'bg-purple-100 text-purple-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {resource.type.toUpperCase()}
                            </span>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              {resource.level}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {resource.duration}
                        </div>
                        
                        {resource.downloadUrl ? (
                          <Link 
                            href={resource.downloadUrl}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Link>
                        ) : (
                          <Link 
                            href={resource.externalUrl || '#'}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 lg:p-12 rounded-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get New Resources First
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join our educator community and receive new resources, research updates, 
                and exclusive content delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 font-medium"
                />
                <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-blue-200 mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
