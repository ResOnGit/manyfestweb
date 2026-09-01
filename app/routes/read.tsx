import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router";
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

type ReadLocationState = {
  fromOpenAnimation?: boolean;
};

export default function Read({ params }: Route.ComponentProps) {
  const location = useLocation();
  const fromOpenAnimation = Boolean(
    (location.state as ReadLocationState | null)?.fromOpenAnimation,
  );
  const volume = getVolume(params.volId);
  const [pageIndex, setPageIndex] = useState(() =>
    volume && volume.status !== "wip" ? getLastPageIndex(volume.id) : 0,
  );

  useEffect(() => {
    if (!volume || volume.status === "wip") return;
    setPageIndex(getLastPageIndex(volume.id));
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
    <div
      className="reader-shell"
      data-from-open={fromOpenAnimation ? "true" : undefined}
    >
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
        <ComicReader
          volume={volume}
          pageIndex={pageIndex}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
