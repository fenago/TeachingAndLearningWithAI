import { motion } from 'framer-motion';

export default function HeaderTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section to showcase header */}
      <div className="relative bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Authentication Header Integration
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Experience the seamless authentication flow with modal popups, 
              user profiles, and session management integrated directly into the header.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left">
              <h3 className="text-lg font-semibold mb-4">✨ Try These Features:</h3>
              <ul className="space-y-2 text-white/90">
                <li>• <strong>Unauthenticated:</strong> Click "Sign In" or "Get Started" buttons in header</li>
                <li>• <strong>Modal Flow:</strong> Test Google OAuth and Magic Link authentication</li>
                <li>• <strong>User Menu:</strong> After login, click your profile for dropdown menu</li>
                <li>• <strong>Mobile:</strong> Test responsive design on mobile devices</li>
                <li>• <strong>Session:</strong> Navigate between pages to see persistent auth state</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Unauthenticated State */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Unauthenticated State
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• "Sign In" and "Get Started" buttons</li>
              <li>• Modal authentication popup</li>
              <li>• Two-tab design (Sign In / Sign Up)</li>
              <li>• Google OAuth integration</li>
              <li>• Magic Link email form</li>
            </ul>
          </div>

          {/* Authenticated State */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Authenticated State
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• User avatar and name display</li>
              <li>• Dropdown menu with profile options</li>
              <li>• Dashboard, Profile, Settings links</li>
              <li>• Sign Out functionality</li>
              <li>• Session persistence</li>
            </ul>
          </div>

          {/* Mobile Experience */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Mobile Experience
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Responsive hamburger menu</li>
              <li>• Full-width authentication buttons</li>
              <li>• Mobile-optimized user profile</li>
              <li>• Smooth slide-in animations</li>
              <li>• Touch-friendly interactions</li>
            </ul>
          </div>

          {/* Design Features */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Design Features
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Brand gradient colors</li>
              <li>• Glass-morphism effects</li>
              <li>• Smooth Framer Motion animations</li>
              <li>• Consistent spacing and typography</li>
              <li>• Professional educator styling</li>
            </ul>
          </div>

          {/* Technical Features */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Technical Features
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• NextAuth.js session management</li>
              <li>• Google OAuth provider</li>
              <li>• Email magic link authentication</li>
              <li>• Automatic session state updates</li>
              <li>• Protected route handling</li>
            </ul>
          </div>

          {/* User Experience */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              User Experience
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Educator-focused messaging</li>
              <li>• Clear benefit communication</li>
              <li>• Success states and feedback</li>
              <li>• Intuitive navigation flow</li>
              <li>• Accessibility considerations</li>
            </ul>
          </div>
        </div>

        {/* Implementation Notes */}
        <div className="mt-12 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            🚀 Implementation Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#667eea] mb-2">Header Integration</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                The AuthHeader component seamlessly replaces the original Header, 
                providing authentication-aware navigation with modal popups and user menus.
              </p>
              
              <h4 className="font-semibold text-[#667eea] mb-2">Session Management</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Built on NextAuth.js with automatic session state updates across 
                all components and pages for consistent user experience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#667eea] mb-2">Usage Example</h4>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm font-mono">
                <div className="text-gray-600 dark:text-gray-400">
                  {`// Replace in layout.tsx
import AuthHeader from '@/components/AuthHeader';

// Automatic session handling
<AuthHeader />
{children}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Header Authentication Test',
  description: 'Testing integrated authentication header with modal and user menu functionality',
};
