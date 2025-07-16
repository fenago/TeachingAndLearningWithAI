import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import Link from 'next/link';
import { Calendar, Clock, Users, Award, BookOpen, ArrowRight } from 'lucide-react';

// Enhanced SEO metadata for Workshops page
export const metadata = getSEOTags({
  title: "AI Teaching Workshops | Professional Development for Educators | LearningScience.io",
  description: "Transform your teaching with our research-based AI workshops. Learn productive struggle methodology through hands-on professional development designed for K-12 and college educators.",
  canonicalUrlRelative: "/workshops",
  keywords: [
    "AI teaching workshops",
    "educator professional development",
    "productive struggle training",
    "AI education workshops",
    "teacher training AI",
    "K-12 AI professional development",
    "college faculty AI training",
    "educational technology workshops",
    "Dr. Ernesto Lee workshops"
  ],
  openGraph: {
    title: "Professional AI Teaching Workshops - Transform Your Classroom",
    description: "Join leading educators in mastering AI-enhanced teaching through productive struggle methodology. Expert-led workshops for K-12 and college instructors.",
    images: [
      {
        url: "/images/workshops-og.jpg",
        width: 1200,
        height: 630,
        alt: "AI Teaching Workshops for Educators"
      }
    ]
  }
});

// Course schema for workshops
const workshopSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://learningscience.io/workshops#productive-struggle-workshop",
  name: "Productive Struggle: AI-Enhanced Teaching Workshop",
  description: "A comprehensive professional development workshop teaching educators how to implement productive struggle methodology with AI tools while preserving meaningful learning experiences.",
  provider: {
    "@type": "EducationalOrganization",
    name: "LearningScience.io",
    url: "https://learningscience.io"
  },
  instructor: {
    "@type": "Person",
    name: "Dr. Ernesto Lee",
    jobTitle: "Educational AI Researcher",
    description: "Leading expert in productive struggle methodology and AI-enhanced education"
  },
  courseMode: ["online", "in-person"],
  educationalLevel: "Professional Development",
  audience: {
    "@type": "EducationalAudience",
    audienceType: ["K-12 Teachers", "College Faculty", "Educational Leaders"]
  },
  timeRequired: "PT6H",
  numberOfCredits: 6,
  coursePrerequisites: "Basic computer literacy and classroom teaching experience",
  syllabusSections: [
    {
      "@type": "Syllabus",
      name: "Understanding Productive Struggle",
      description: "Foundation principles of productive struggle in learning"
    },
    {
      "@type": "Syllabus", 
      name: "AI Tools for Educators",
      description: "Practical AI applications that enhance rather than replace learning"
    },
    {
      "@type": "Syllabus",
      name: "Implementation Strategies",
      description: "Hands-on practice and classroom integration techniques"
    }
  ],
  offers: {
    "@type": "Offer",
    price: "299.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: "2024-01-01",
    category: "Professional Development"
  }
};

export default function WorkshopsPage() {
  return (
    <>
      {/* Course Structured Data */}
      {renderSchemaTags(workshopSchema)}
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-20 lg:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Transform Your Teaching with 
                <span className="block text-yellow-300">AI-Enhanced Workshops</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Master productive struggle methodology through research-based professional development 
                designed for K-12 and college educators ready to harness AI's power responsibly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="#workshops" 
                  className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors inline-flex items-center gap-2"
                >
                  View Workshops <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/about-author" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Meet Dr. Lee
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Workshop Features */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Our Workshops Work</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Research-based professional development that bridges the gap between AI innovation 
                and meaningful educational practice.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Research-Based</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Founded on peer-reviewed educational research and cognitive science principles.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Educator-Focused</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Designed by educators, for educators. Practical strategies you can implement immediately.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Time-Efficient</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Compact 6-hour format with maximum impact and minimal disruption to your schedule.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Certified Learning</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Earn 6 professional development credits recognized by educational institutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Workshop */}
        <section id="workshops" className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Productive Struggle: AI-Enhanced Teaching Workshop
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        Learn how to integrate AI tools into your teaching while maintaining the cognitive 
                        effort essential for meaningful learning. This comprehensive workshop combines 
                        research-based methodology with hands-on practice.
                      </p>
                      
                      <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <span>6 Hours Total</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-purple-600" />
                          <span>Max 25 Participants</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-green-600" />
                          <span>Multiple Dates Available</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-yellow-600" />
                          <span>6 PD Credits</span>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">What You'll Learn:</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-3">
                            <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Productive struggle principles and cognitive science foundations</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>AI tools that enhance rather than eliminate learning challenges</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Practical implementation strategies for your classroom</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Assessment techniques that preserve authentic learning</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Student engagement strategies in the AI era</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="lg:w-80">
                      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-xl">
                        <div className="text-center mb-6">
                          <div className="text-3xl font-bold">$299</div>
                          <div className="text-blue-100">per participant</div>
                        </div>
                        
                        <div className="space-y-3 mb-6 text-sm">
                          <div className="flex justify-between">
                            <span>Workshop Access</span>
                            <span>✓</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Course Materials</span>
                            <span>✓</span>
                          </div>
                          <div className="flex justify-between">
                            <span>6 PD Credits</span>
                            <span>✓</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Certificate</span>
                            <span>✓</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Follow-up Support</span>
                            <span>✓</span>
                          </div>
                        </div>
                        
                        <button className="w-full bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors">
                          Register Now
                        </button>
                        
                        <p className="text-xs text-blue-100 mt-3 text-center">
                          Group discounts available for 5+ participants
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Teaching?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Join hundreds of educators who have already discovered how to harness 
                AI's power while preserving the productive struggle essential for deep learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Schedule Consultation
                </button>
                <Link 
                  href="/chapter-1-preview" 
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Preview Chapter 1
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
