import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-zinc-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-zinc-400">
            &copy; {currentYear} Blogging Platform
          </div>
          
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
