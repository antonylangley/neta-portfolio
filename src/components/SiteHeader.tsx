"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/88 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link
          className="group inline-flex items-center gap-3 rounded-full pr-3 text-sm font-bold text-charcoal focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-blue"
          href="/"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid size-9 place-items-center rounded-full border border-charcoal bg-charcoal text-canvas">
            {site.monogram}
          </span>
          <span className="leading-none">
            {site.name}
            <span className="block text-xs font-medium text-muted">{site.title}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-line bg-surface p-1 shadow-soft md:flex">
          {site.nav.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue ${
                  isActive
                    ? "bg-charcoal text-canvas"
                    : "text-muted hover:bg-white hover:text-charcoal"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-charcoal transition hover:border-charcoal focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </nav>

      <div
        className={`border-t border-line bg-canvas px-4 py-3 md:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="mx-auto grid max-w-7xl gap-2">
          {site.nav.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`min-h-11 rounded-lg px-3 py-3 text-base font-semibold focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue ${
                  isActive ? "bg-charcoal text-canvas" : "text-charcoal hover:bg-surface"
                }`}
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
