import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import { redirect } from "next/navigation";
import ButtonAccount from "@/components/ButtonAccount";
import AuthValidationClient from "@/components/AuthValidationClient";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  // Redirect if not authenticated
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-8 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Hello, {session.user?.name || session.user?.email || 'Educator'}! 👋
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {session.user?.image && (
                <div className="flex items-center gap-4">
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'Profile'}
                    className="w-16 h-16 rounded-full border-4 border-gradient-to-r from-[#667eea] to-[#764ba2]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{session.user.name}</h3>
                    <p className="text-gray-600">{session.user.email}</p>
                  </div>
                </div>
              )}
              {!session.user?.image && (
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{session.user?.name || 'Educator'}</h3>
                    <p className="text-gray-600">{session.user?.email}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center md:justify-end">
              <ButtonAccount />
            </div>
          </div>
        </div>

        {/* Authentication Validation */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Authentication Status</h2>
          <AuthValidationClient />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              📚
            </div>
            <h3 className="text-xl font-semibold mb-2">Continue Reading</h3>
            <p className="text-gray-600 mb-4">Pick up where you left off in the book</p>
            <a href="/#hero" className="text-blue-600 hover:text-blue-700 font-medium">
              Go to Book →
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              👨‍🏫
            </div>
            <h3 className="text-xl font-semibold mb-2">About Dr. Lee</h3>
            <p className="text-gray-600 mb-4">Learn more about the author</p>
            <a href="/about-author" className="text-green-600 hover:text-green-700 font-medium">
              Read Bio →
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              📖
            </div>
            <h3 className="text-xl font-semibold mb-2">Chapter Preview</h3>
            <p className="text-gray-600 mb-4">Interactive page flip experience</p>
            <a href="/chapter-1-preview" className="text-purple-600 hover:text-purple-700 font-medium">
              Try Demo →
            </a>
          </div>
        </div>

        {/* Session Info (for debugging) */}
        <details className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <summary className="text-lg font-semibold cursor-pointer text-gray-700 hover:text-gray-900">
            🔍 Session Details (Developer Info)
          </summary>
          <div className="mt-4 space-y-2">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-sm text-gray-600 mb-2">RAW SESSION DATA:</h4>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto text-gray-800">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
        </details>
      </div>
    </main>
  );
}
