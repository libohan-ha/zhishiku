'use client';

import Navbar from './Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {children}
      </main>
      <footer className="bg-gray-100 py-3 sm:py-4 mt-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-xs sm:text-sm">
          © {new Date().getFullYear()} 个人知识库 - 由 Next.js 和 Supabase 提供支持
        </div>
      </footer>
    </div>
  );
}
