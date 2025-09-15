"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-purple-900 text-white px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-12 h-8 sm:w-16 sm:h-12">
            <Image 
              src="/logo.svg" 
              alt="THE NOISY LAB Logo" 
              width={79} 
              height={53} 
              className="w-full h-full"
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 lg:space-x-8">
          <a href="/about" className="hover:text-orange-400 transition-colors">About us</a>
          <a href="/services" className="hover:text-orange-400 transition-colors">Services</a>
          <a href="/career" className="hover:text-orange-400 transition-colors">Career</a>
        </nav>
        
        {/* Desktop Contact Button */}
        <a 
          href="/contact" 
          className="hidden md:inline-block bg-purple-800 hover:bg-purple-700 px-4 sm:px-6 py-2 rounded-full transition-colors text-sm sm:text-base"
        >
          Contact us
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-800 border-t border-purple-700">
          <nav className="flex flex-col space-y-4 px-4 py-4">
            <a 
              href="/about" 
              className="hover:text-orange-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About us
            </a>
            <a 
              href="/services" 
              className="hover:text-orange-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="/career" 
              className="hover:text-orange-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Career
            </a>
            <a 
              href="/contact" 
              className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-full transition-colors text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
