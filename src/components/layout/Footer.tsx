import { Github, Twitter, Mail, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-text-muted font-mono text-sm">
          <p>© {new Date().getFullYear()} ADULT_ARTIST. All rights reserved.</p>
          <p className="text-text-comment mt-1">status: &apos;Translating && Creating&apos;</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="p-2 text-text-muted hover:text-accent-cyan transition-colors bg-white/5 rounded-full hover:bg-white/10">
            <Twitter size={20} />
          </a>
          <a href="#" className="p-2 text-text-muted hover:text-accent-cyan transition-colors bg-white/5 rounded-full hover:bg-white/10">
            <Github size={20} />
          </a>
          <a href="#" className="p-2 text-text-muted hover:text-accent-cyan transition-colors bg-white/5 rounded-full hover:bg-white/10">
            <Mail size={20} />
          </a>
          <a href="#" className="p-2 text-text-muted hover:text-accent-cyan transition-colors bg-white/5 rounded-full hover:bg-white/10 cursor-pointer" title="Portaly">
            <LinkIcon size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
