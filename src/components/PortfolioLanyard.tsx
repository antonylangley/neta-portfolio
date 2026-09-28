"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("./lanyard/Lanyard"), { ssr: false });

export function PortfolioLanyard() {
  return (
    <div
      aria-label="Interactive 3D portfolio lanyard badge for Neta Rogovsky"
      className="lanyard-stage"
    >
      <Lanyard />
    </div>
  );
}
