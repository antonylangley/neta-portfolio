"use client";

import { useState } from "react";
import { ExternalLink, LoaderCircle } from "lucide-react";
import type { DeviceType } from "@/data/projects";

type FigmaPrototypeProps = {
  projectTitle: string;
  figmaEmbedUrl: string;
  fullPrototypeUrl: string;
  deviceType: DeviceType;
  aspectRatio?: string;
  description?: string;
  height?: number;
};

const deviceClasses: Record<DeviceType, string> = {
  desktop: "max-w-6xl",
  tablet: "max-w-3xl",
  mobile: "max-w-sm",
};

export function FigmaPrototype({
  projectTitle,
  figmaEmbedUrl,
  fullPrototypeUrl,
  deviceType,
  aspectRatio,
  description,
  height,
}: FigmaPrototypeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const hasEmbed = figmaEmbedUrl.trim().length > 0;
  const hasFullUrl = fullPrototypeUrl.trim().length > 0;

  return (
    <div className="rounded-lg border border-line bg-surface p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-muted">{deviceType} prototype</p>
          {description ? <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">{description}</p> : null}
        </div>
        {hasFullUrl ? (
          <a
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-charcoal bg-white px-4 py-2 text-sm font-semibold text-charcoal transition hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
            href={fullPrototypeUrl}
            rel="noreferrer"
            target="_blank"
          >
            Open full prototype
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        ) : (
          <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-dashed border-line px-4 py-2 text-sm font-semibold text-muted">
            Open full prototype after adding URL
          </span>
        )}
      </div>

      <div className={`mx-auto ${deviceClasses[deviceType]}`}>
        <div
          className="relative overflow-hidden rounded-lg border border-charcoal bg-white shadow-selection"
          style={{
            aspectRatio: aspectRatio ?? (deviceType === "mobile" ? "9 / 19" : "16 / 10"),
            minHeight: deviceType === "mobile" ? 520 : undefined,
            maxHeight: height,
          }}
        >
          {hasEmbed ? (
            <>
              {!isLoaded ? (
                <div className="absolute inset-0 grid place-items-center bg-surface text-sm font-semibold text-muted">
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                    Loading prototype
                  </span>
                </div>
              ) : null}
              <iframe
                allowFullScreen
                className="h-full w-full border-0"
                onLoad={() => setIsLoaded(true)}
                src={figmaEmbedUrl}
                title={`${projectTitle} Figma prototype`}
              />
            </>
          ) : (
            <div className="grid h-full place-items-center px-6 py-12 text-center">
              <div>
                <p className="text-sm font-bold text-charcoal">Figma embed placeholder</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                  Paste only the iframe src or Figma embed URL in src/data/projects.ts. The portfolio
                  never needs Figma edit permissions.
                </p>
              </div>
            </div>
          )}
        </div>
        <p className="mt-3 text-center text-xs leading-5 text-muted">
          If the embed cannot load, use the full prototype link above after the real URL is added.
        </p>
      </div>
    </div>
  );
}
