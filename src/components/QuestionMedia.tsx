"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { QuestionImageAsset, QuestionMedia as QuestionMediaType } from "@/types/skillquest";
import { Soft3DIcon } from "./icons/soft-3d-icon";

type QuestionMediaProps = {
  media: QuestionMediaType;
  showEnglish: boolean;
  showThai: boolean;
};

export function QuestionMedia({ media, showEnglish, showThai }: QuestionMediaProps) {
  const [zoomedImage, setZoomedImage] = useState<QuestionImageAsset | null>(null);
  const images = media.images.slice(0, media.type === "image-comparison" ? 2 : 1);

  return (
    <div className="mt-6">
      <div className={media.type === "image-comparison" ? "grid gap-3 md:grid-cols-2" : "grid gap-3"}>
        {images.map((image) => (
          <QuestionImage
            key={image.id}
            image={image}
            displayMode={media.displayMode ?? "contain"}
            allowZoom={Boolean(media.allowZoom)}
            showEnglish={showEnglish}
            showThai={showThai}
            onZoom={() => setZoomedImage(image)}
          />
        ))}
      </div>
      {zoomedImage ? (
        <ImageZoomDialog
          image={zoomedImage}
          showEnglish={showEnglish}
          showThai={showThai}
          onClose={() => setZoomedImage(null)}
        />
      ) : null}
    </div>
  );
}

function QuestionImage({
  image,
  displayMode,
  allowZoom,
  showEnglish,
  showThai,
  onZoom,
}: {
  image: QuestionImageAsset;
  displayMode: "contain" | "cover";
  allowZoom: boolean;
  showEnglish: boolean;
  showThai: boolean;
  onZoom: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageClassName = displayMode === "cover" ? "object-cover" : "object-contain";

  return (
    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] shadow-[var(--elev-3)]">
      {image.label ? (
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">{image.label}</span>
          {allowZoom ? (
            <button
              type="button"
              onClick={onZoom}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)] focus:outline-none focus:ring-2 focus:ring-black"
              aria-label={`Zoom image ${image.label}`}
            >
              <Soft3DIcon name="actionZoom" size="sm" decorative />
            </button>
          ) : null}
        </div>
      ) : null}
      <button
        type="button"
        disabled={!allowZoom || hasError}
        onClick={onZoom}
        className="relative block w-full cursor-zoom-in disabled:cursor-default"
        aria-label={allowZoom ? `Open larger image: ${image.altEn}` : undefined}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)]">
          {!hasError ? (
            <>
              {!isLoaded ? (
                <div className="absolute inset-0 z-10 grid place-items-center bg-[var(--surface-2)] text-xs font-semibold text-[var(--text-muted)]">
                  Loading image
                </div>
              ) : null}
              <Image
                src={image.src}
                alt={showThai && !showEnglish ? image.altTh : image.altEn}
                fill
                sizes="(min-width: 1280px) 760px, (min-width: 768px) 88vw, 92vw"
                className={`${imageClassName} p-2 transition duration-200 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                loading="eager"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                unoptimized
              />
            </>
          ) : (
            <div className="grid h-full place-items-center p-6 text-center">
              <div>
                <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">Image unavailable</p>
                <p className="font-subtitle mt-1 text-xs leading-5 text-[var(--text-secondary)]">{image.altEn}</p>
              </div>
            </div>
          )}
        </div>
      </button>
      {image.captionEn || image.captionTh ? (
        <figcaption className="border-t border-[var(--border)] px-4 py-3">
          {showEnglish && image.captionEn ? <p className="font-subtitle text-xs leading-5 text-[var(--text-secondary)]">{image.captionEn}</p> : null}
          {showThai && image.captionTh ? <p className="font-subtitle mt-1 text-xs leading-6 text-[var(--text-secondary)]">{image.captionTh}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ImageZoomDialog({
  image,
  showEnglish,
  showThai,
  onClose,
}: {
  image: QuestionImageAsset;
  showEnglish: boolean;
  showThai: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={showThai && !showEnglish ? image.altTh : image.altEn}
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-6xl rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-3 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-primary)] transition hover:bg-[var(--surface-2)] focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Close image preview"
        >
          <Soft3DIcon name="statusIncorrect" size="sm" decorative />
        </button>
        <div className="grid max-h-[78vh] place-items-center overflow-hidden rounded-[var(--radius-sm)] bg-[var(--surface)]">
          <Image
            src={image.src}
            alt={showThai && !showEnglish ? image.altTh : image.altEn}
            width={image.width}
            height={image.height}
            className="h-auto max-h-[78vh] w-auto max-w-full object-contain"
            unoptimized
           
          />
        </div>
        {image.captionEn || image.captionTh ? (
          <div className="px-2 pt-3">
            {showEnglish && image.captionEn ? <p className="font-subtitle text-sm leading-6 text-[var(--text-secondary)]">{image.captionEn}</p> : null}
            {showThai && image.captionTh ? <p className="font-subtitle mt-1 text-sm leading-7 text-[var(--text-secondary)]">{image.captionTh}</p> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
