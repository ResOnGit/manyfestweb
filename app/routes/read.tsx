import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { ComicReader } from "~/components/ComicReader";
import { SITE } from "~/config";
import { getVolume } from "~/data/catalog";
import { getLastPageIndex, setLastPageIndex } from "~/lib/progress";
import type { Route } from "./+types/read";

export function meta({ params }: Route.MetaArgs) {
  const volume = getVolume(params.volId ?? "");
  return [
    { title: volume ? `${SITE.name} — ${volume.title}` : `${SITE.name} — reader` },
  ];
}

export default function Read({ params }: Route.ComponentProps) {
  const volume = getVolume(params.volId);
  const [ready, setReady] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (!volume || volume.status === "wip") return;
    setPageIndex(getLastPageIndex(volume.id));
    setReady(true);
  }, [volume]);

  if (!volume || volume.status === "wip") {
    return <Navigate to="/" replace />;
  }

  const openVolume = volume;

  function onPageChange(nextIndex: number) {
    setPageIndex(nextIndex);
    setLastPageIndex(openVolume.id, nextIndex);
  }

  return (
    <div className="reader-shell">
      <header className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-[#c8bca8]">
        <Link
          to="/"
          className="tracking-wide text-[#c8bca8] hover:text-white"
        >
          ← shelf
        </Link>
        <p className="font-display italic">{SITE.name}</p>
        <p className="truncate text-[#8a7a68]">{volume.title}</p>
      </header>
      <div className="reader-stage h-full">
        {ready ? (
          <ComicReader
            volume={volume}
            pageIndex={pageIndex}
            onPageChange={onPageChange}
          />
        ) : (
          <p className="grid h-full place-items-center text-[#8a7a68]">
            shuffling pages…
          </p>
        )}
      </div>
    </div>
  );
}
