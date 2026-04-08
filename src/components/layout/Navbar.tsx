"use client";

import { Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-dark/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-accent-cyan font-mono hover:opacity-80 transition-opacity"
        >
          <Terminal size={24} />
          <span className="font-bold tracking-wider">ADULT_ARTIST</span>
        </Link>
        <div className="hidden md:flex gap-8 text-text-muted font-mono text-sm">
          <Link href="/#about" className="hover:text-accent-orange transition-colors">
            // ABOUT
          </Link>
          <Link href="/#pinned" className="hover:text-accent-orange transition-colors">
            // PINNED
          </Link>
          <Link href="/#recent" className="hover:text-accent-orange transition-colors">
            // RECENT
          </Link>
        </div>
      </div>
    </nav>
  );
}
