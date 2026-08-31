import { ComicViewer } from "react-comic-viewer";
import "react-comic-viewer/styles.css";
import { publicUrl } from "~/lib/assets";
import type { Volume } from "~/data/catalog";

type ComicReaderProps = {
  volume: Volume;
  pageIndex: number;
  onPageChange: (pageIndex: number) => void;
};

export function ComicReader({
  volume,
  pageIndex,
  onPageChange,
}: ComicReaderProps) {
  return (
    <ComicViewer
      className={{ wrapper: "h-full min-h-0" }}
      pages={volume.pages.map((page) => publicUrl(page))}
      direction={volume.direction}
      currentPage={pageIndex}
      onChangeCurrentPage={onPageChange}
      showPageIndicator
    />
  );
}
