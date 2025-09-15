"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, AlignJustify } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { type Dictionary } from "@/components/internationalization/dictionaries";
import { type Locale } from "@/components/internationalization/config";

interface NavbarProps {
  dictionary: Dictionary;
  lang: Locale;
}

export default function Navbar({ dictionary, lang }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { label: dictionary.navigation.men, href: `/${lang}/products?gender=men` },
    { label: dictionary.navigation.women, href: `/${lang}/products?gender=women` },
    { label: dictionary.navigation.kids, href: `/${lang}/products?gender=unisex` },
    { label: dictionary.navigation.products, href: `/${lang}/products` },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-light-100">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        {/* Left Side - Logo */}
        <div className="flex items-center flex-1">
          <Link href={`/${lang}`} aria-label="Nike Home" className="flex items-center">
            <Image src="/logo.svg" alt="Nike" width={28} height={28} priority className="invert" />
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-body text-dark-900 transition-colors hover:text-dark-700"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side - Actions */}
        <div className="hidden items-center gap-3 md:flex flex-1 justify-end">
          <button
            className="text-dark-900 transition-colors hover:text-dark-700"
            aria-label={dictionary.navigation.search}
          >
            <Search size={20} />
          </button>
          <button
            className="relative text-dark-900 transition-colors hover:text-dark-700"
            aria-label={dictionary.navigation.cart}
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-[#d33918] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>
          <LanguageSwitcher currentLocale={lang} />
        </div>

        {/* Mobile Actions - Language Switcher and Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher currentLocale={lang} />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{dictionary.navigation.menu}</span>
            <AlignJustify size={24} className="text-dark-900" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`border-t border-light-300 md:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="space-y-2 px-4 py-3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block py-2 text-body text-dark-900 hover:text-dark-700"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center justify-between pt-2">
            <button className="flex items-center gap-2 text-body" aria-label={dictionary.navigation.search}>
              <Search size={20} />
              {dictionary.navigation.search}
            </button>
            <button className="relative flex items-center gap-2 text-body" aria-label={dictionary.navigation.cart}>
              <ShoppingCart size={20} />
              {dictionary.navigation.cart}
              <span className="bg-[#d33918] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                0
              </span>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}