"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useId, useState } from "react";

export type InspectableImage = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

type InspectorModalProps = {
  galleryLabel?: string;
  images: InspectableImage[];
  initialIndex?: number;
  initialZoom?: number;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

type InspectableImageCardProps = {
  image: InspectableImage;
  imageClassName?: string;
  initialZoom?: number;
  modalTitle: string;
  triggerAriaLabel: string;
  triggerClassName?: string;
};

const minZoom = 0.75;
const maxZoom = 3;
const zoomStep = 0.25;

function clampZoom(value: number) {
  return Math.min(maxZoom, Math.max(minZoom, Number(value.toFixed(2))));
}

function InspectorModal({
  galleryLabel,
  images,
  initialIndex = 0,
  initialZoom = 1,
  isOpen,
  onClose,
  title,
}: InspectorModalProps) {
  const titleId = useId();
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(initialZoom);
  const activeImage = images[activeIndex] ?? images[0];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    function handleWindowKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleWindowKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleWindowKeyDown);
    };
  }, [initialZoom, isOpen, onClose]);

  if (!isOpen || !activeImage) {
    return null;
  }

  const zoomPercent = Math.round(zoom * 100);
  const imageStyle = {
    width: `${Math.round(activeImage.width * zoom)}px`,
  } as CSSProperties;

  return (
    <div
      className="inspector-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className={`inspector-panel ${images.length > 1 ? "is-gallery" : ""}`}
        role="dialog"
      >
        <div className="inspector-topbar">
          <h3 id={titleId}>{title}</h3>
          <div className="inspector-actions">
            <button aria-label="Zoom out" onClick={() => setZoom(clampZoom(zoom - zoomStep))}>
              -
            </button>
            <input
              aria-label="Zoom level"
              max={maxZoom}
              min={minZoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              step={zoomStep}
              type="range"
              value={zoom}
            />
            <button aria-label="Zoom in" onClick={() => setZoom(clampZoom(zoom + zoomStep))}>
              +
            </button>
            <span>{zoomPercent}%</span>
            <button onClick={() => setZoom(initialZoom)} type="button">
              Reset
            </button>
            <button
              aria-label="Close viewer"
              autoFocus
              className="inspector-close"
              onClick={onClose}
              type="button"
            >
              X
            </button>
          </div>
        </div>

        <div className="inspector-body">
          {images.length > 1 ? (
            <div aria-label={galleryLabel} className="inspector-thumbs">
              {images.map((image, index) => (
                <button
                  aria-label={`Open image ${index + 1}`}
                  className="inspector-thumb"
                  data-active={index === activeIndex}
                  key={image.src}
                  onClick={() => setActiveIndex(index)}
                  style={{ "--item-index": index } as CSSProperties}
                  type="button"
                >
                  <Image alt={image.alt} height={image.height} src={image.src} width={image.width} />
                </button>
              ))}
            </div>
          ) : null}

          <div className="inspector-viewport">
            <Image
              alt={activeImage.alt}
              className="inspector-image"
              height={activeImage.height}
              src={activeImage.src}
              style={imageStyle}
              width={activeImage.width}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function InspectableImageCard({
  image,
  imageClassName,
  initialZoom = 1,
  modalTitle,
  triggerAriaLabel,
  triggerClassName,
}: InspectableImageCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-label={triggerAriaLabel}
        className={`inspect-card ${triggerClassName ?? ""}`}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <Image
          alt={image.alt}
          className={imageClassName}
          height={image.height}
          src={image.src}
          width={image.width}
        />
      </button>
      {isOpen ? (
        <InspectorModal
          images={[image]}
          initialZoom={initialZoom}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={modalTitle}
        />
      ) : null}
    </>
  );
}

export function InspectableGallery({
  images,
  initialZoom = 1,
  modalTitle,
  previewIndex = 0,
}: {
  images: InspectableImage[];
  initialZoom?: number;
  modalTitle: string;
  previewIndex?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const previewImage = images[previewIndex] ?? images[0];

  if (!previewImage) {
    return null;
  }

  return (
    <>
      <button
        aria-label={`Open ${modalTitle}`}
        className="chimera-preview inspect-card"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <span className="chimera-preview-meta">
          <span>Original UI</span>
          <span>{images.length} screens</span>
        </span>
        <Image
          alt="Dimmed preview of the original Chimera app UI."
          height={previewImage.height}
          src={previewImage.src}
          width={previewImage.width}
        />
      </button>
      {isOpen ? (
        <InspectorModal
          galleryLabel="Original Chimera UI screenshots"
          images={images}
          initialIndex={previewIndex}
          initialZoom={initialZoom}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={modalTitle}
        />
      ) : null}
    </>
  );
}
