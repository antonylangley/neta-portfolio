"use client";

import Link from "next/link";
import { useState } from "react";

type NavProps = {
  activePage: "home" | "about";
};

const resumePath = "/resume.pdf";
const email = "nr598@njit.edu";

export function Nav({ activePage }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav aria-label="Primary" className="nav-shell">
        <div className="nav-inner">
          <div className="nav-desktop-links">
            <Link className="nav-link" data-active={activePage === "home"} href="/#work">
              Work
            </Link>
            <Link className="nav-link" data-active={activePage === "about"} href="/about">
              About
            </Link>
            <a className="nav-link" href={resumePath} rel="noopener noreferrer" target="_blank">
              Resume
            </a>
            <a className="nav-link" href={`mailto:${email}`}>
              Contact
            </a>
          </div>
          <button
            aria-controls="nav-mobile-panel"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="nav-mobile-btn"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            {menuOpen ? "x" : "+"}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="nav-mobile-panel" id="nav-mobile-panel" role="menu">
          <Link href="/#work" onClick={() => setMenuOpen(false)} role="menuitem">
            Work
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} role="menuitem">
            About
          </Link>
          <a href={resumePath} rel="noopener noreferrer" role="menuitem" target="_blank">
            Resume
          </a>
          <a href={`mailto:${email}`} role="menuitem">
            Contact
          </a>
        </div>
      ) : null}
    </>
  );
}
