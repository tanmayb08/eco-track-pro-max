import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 pt-20 pb-8 text-center">
        <div className="max-w-[800px] mx-auto">
          <div className="relative inline-block">
  {/* Floating emojis */}
  <span className="absolute -top-6 -left-8 text-3xl hidden sm:block animate-float-slow">🛠️</span>
  <span className="absolute -top-10 right-0 text-3xl hidden sm:block animate-float-slow">🔧</span>
  <span className="absolute top-1/2 -right-10 text-3xl hidden sm:block animate-float-slow">♻️</span>
  <span className="absolute bottom-0 -left-10 text-3xl hidden sm:block animate-float-slow">💰</span>

  {/* Heading */}
  <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
    Share tools. Save money. Reduce waste.
  </h1>
</div>


          <p className="text-xl text-gray-500 mb-12 leading-relaxed">
            Join your community in sharing tools and equipment. Rent what you need, when you need it, and earn money from items you already own.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/get-started"
              className="bg-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-block transition-all"
            >
              Get Started
            </Link>

            <Link
              href="/search"
              className="bg-white text-emerald-500 px-8 py-4 rounded-lg text-lg font-semibold inline-block border-2 border-emerald-500 transition-all"
            >
              Browse Tools
            </Link>
          </div>
        </div>

        <div className="mt-24 bg-blue-50 rounded-xl px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Share Your Tools
          </h2>
          <p className="text-lg text-gray-500 mb-6 leading-relaxed">
            Have tools you&apos;re not using? List them on EcoTrack and earn money while helping your community.
          </p>
          <Link
            href="/add-tool"
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg text-base font-semibold inline-block"
          >
            List a Tool
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">
              💰
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Save Money
            </h3>
            <p className="text-base text-gray-500 leading-snug">
              Rent tools instead of buying. Save hundreds on expensive equipment you only use occasionally.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">
              🤝
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Build Community
            </h3>
            <p className="text-base text-gray-500 leading-snug">
              Connect with neighbors and build a stronger, more sustainable community through sharing.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">
              ♻️
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Reduce Waste
            </h3>
            <p className="text-base text-gray-500 leading-snug">
              Make the most of existing resources. Less manufacturing means less environmental impact.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
