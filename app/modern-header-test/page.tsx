import { motion } from 'framer-motion';

export default function ModernHeaderTestPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="relative min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#667eea] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-8 pt-32 pb-20">
          <div className="text-center max-w-5xl mx-auto text-white">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Modern Navigation
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Featuring glassmorphism design, smooth animations, intelligent navigation, 
              and seamless authentication integration.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  ✨
                </div>
                <h3 className="text-lg font-semibold mb-2">Glassmorphism Design</h3>
                <p className="text-white/80 text-sm">Beautiful glass-like effects with backdrop blur and subtle borders</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  🚀
                </div>
                <h3 className="text-lg font-semibold mb-2">Smooth Animations</h3>
                <p className="text-white/80 text-sm">Framer Motion powered transitions and micro-interactions</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  🎯
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Navigation</h3>
                <p className="text-white/80 text-sm">Intelligent section scrolling with back-to-top functionality</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
          <div className="animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Test Sections for Navigation */}
      <section id="hero" className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Hero Section</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test the "Home" navigation link. This section demonstrates the floating header's 
            ability to smoothly scroll to page sections using hash navigation.
          </p>
        </div>
      </section>

      <section id="problem" className="py-20 bg-white">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Problem Section</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The "Problem" link in the navigation will smoothly scroll to this section. 
            Notice how the header remains fixed and accessible at all times.
          </p>
        </div>
      </section>

      <section id="chapters" className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Chapters Section</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test the "Chapters" navigation. The floating header uses glassmorphism effects 
            to remain visible while maintaining visual hierarchy.
          </p>
        </div>
      </section>

      <section id="social-proof" className="py-20 bg-white">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Reviews Section</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The "Reviews" link brings users here. Each navigation item includes an icon 
            for better visual recognition and improved user experience.
          </p>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Pricing Section</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navigate to pricing with the dedicated "Pricing" link. The header maintains 
            consistency across all sections while providing smooth transitions.
          </p>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">FAQ Section</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The final navigation section. Scroll down further to test the back-to-top 
            button that appears when you've scrolled more than 400 pixels.
          </p>
        </div>
      </section>

      {/* Extended content to test back-to-top */}
      <section className="py-32 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Back to Top Test</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            You should now see the back-to-top button in the bottom-right corner. 
            This floating action button appears automatically when scrolling and 
            provides instant navigation back to the hero section.
          </p>
          
          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">🎨 Modern Design</h3>
              <ul className="text-left text-white/90 space-y-2 text-sm">
                <li>• Glassmorphism effects</li>
                <li>• Floating navigation bar</li>
                <li>• Smooth animations</li>
                <li>• Responsive design</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">⚡ Smart Features</h3>
              <ul className="text-left text-white/90 space-y-2 text-sm">
                <li>• Hash-based navigation</li>
                <li>• Smooth scroll behavior</li>
                <li>• Back-to-top button</li>
                <li>• Mobile-first approach</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">🔐 Authentication</h3>
              <ul className="text-left text-white/90 space-y-2 text-sm">
                <li>• Modal-based auth</li>
                <li>• User profile dropdown</li>
                <li>• Session management</li>
                <li>• Google OAuth support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="py-20 bg-gray-100">
        <div className="container mx-auto px-8 text-center">
          <p className="text-gray-600">
            🎉 You've reached the bottom! The back-to-top button should be visible now.
          </p>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Modern Header Test | Navigation & Authentication',
  description: 'Testing the modern floating header with glassmorphism design, smooth navigation, and authentication features',
};
