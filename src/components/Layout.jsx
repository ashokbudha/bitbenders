import { Outlet, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-brand-neutral flex flex-col font-sans">
      <header className="bg-brand-white border-b border-brand-gray/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-brand-green hover:text-brand-green/90 transition-colors">
            <BookOpen className="w-6 h-6" />
            <span className="font-bold text-lg tracking-tight">StudentPortal</span>
          </Link>
          <nav className="text-sm font-medium text-brand-gray">
            Guided Ecosystem
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-brand-white border-t border-brand-gray/20 py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-brand-gray">
          Student Portal MVP - For Validation
        </div>
      </footer>
    </div>
  );
}
