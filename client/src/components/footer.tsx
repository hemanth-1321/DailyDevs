"use client";

import { GithubIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 mt-16 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
        <p>
          Built with <span className="text-red-500">♥</span> by{" "}
          <span className="font-semibold">Hemanth</span>
        </p>

        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Use
          </Link>
          <a
            href="https://github.com/hemanth-1321/logs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
