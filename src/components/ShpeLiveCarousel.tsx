"use client";

import Image from "next/image";
import { useState } from "react";

const shpeLiveScreens = [
  {
    alt: "SHPE NJIT app home screen with quick actions, announcements, and community highlights.",
    height: 2556,
    label: "Home",
    src: "/images/shpe/live/home.png",
    width: 1179,
  },
  {
    alt: "SHPE NJIT app events screen showing the September event calendar state.",
    height: 1252,
    label: "Events",
    src: "/images/shpe/live/events.png",
    width: 600,
  },
  {
    alt: "SHPE NJIT app rank screen with semester ranking filters and an empty rankings state.",
    height: 2556,
    label: "Rank",
    src: "/images/shpe/live/rank.png",
    width: 1179,
  },
  {
    alt: "SHPE NJIT app profile screen with student details, links, and edit profile action.",
    height: 1178,
    label: "Profile",
    src: "/images/shpe/live/profile.png",
    width: 556,
  },
  {
    alt: "SHPE NJIT app settings screen with account settings, preferences, and resources.",
    height: 1470,
    label: "Settings",
    src: "/images/shpe/live/settings.png",
    width: 552,
  },
];

export function ShpeLiveCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScreen = shpeLiveScreens[activeIndex];

  function showPrevious() {
    setActiveIndex((index) => (index === 0 ? shpeLiveScreens.length - 1 : index - 1));
  }

  function showNext() {
    setActiveIndex((index) => (index === shpeLiveScreens.length - 1 ? 0 : index + 1));
  }

  return (
    <figure className="shpe-carousel-frame">
      <div className="prototype-header">
        <span>Current app screens</span>
        <span>App Store live</span>
      </div>

      <div className="shpe-carousel-stage">
        <button
          aria-label="Previous SHPE app screen"
          className="shpe-carousel-arrow shpe-carousel-arrow-left"
          onClick={showPrevious}
          type="button"
        >
          &lt;
        </button>

        <div className="shpe-carousel-phone">
          <Image
            alt={activeScreen.alt}
            className="shpe-carousel-image"
            height={activeScreen.height}
            key={activeScreen.src}
            priority={activeIndex === 0}
            src={activeScreen.src}
            unoptimized
            width={activeScreen.width}
          />
        </div>

        <button
          aria-label="Next SHPE app screen"
          className="shpe-carousel-arrow shpe-carousel-arrow-right"
          onClick={showNext}
          type="button"
        >
          &gt;
        </button>
      </div>

      <figcaption className="shpe-carousel-footer">
        <span>{activeScreen.label}</span>
        <div aria-label="SHPE app screen selector" className="shpe-carousel-dots">
          {shpeLiveScreens.map((screen, index) => (
            <button
              aria-label={`Show ${screen.label} screen`}
              aria-pressed={index === activeIndex}
              className="shpe-carousel-dot"
              data-active={index === activeIndex}
              key={screen.src}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
        <span>
          {activeIndex + 1} / {shpeLiveScreens.length}
        </span>
      </figcaption>
    </figure>
  );
}
