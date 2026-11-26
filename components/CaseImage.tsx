import fs from "node:fs";
import path from "node:path";

// Shows an image from /public if the file exists; otherwise a labelled placeholder,
// so a page can be built before its images are added. (Checked at build time.)

export default function CaseImage({ src, caption, className = "" }: { src: string; caption: string; className?: string }) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));
  return (
    <figure className={`case-img ${className}`}>
      {exists ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={caption} loading="lazy" />
      ) : (
        <div className="case-img-missing" role="img" aria-label={`${caption} (image coming soon)`}>
          <span>{src.split("/").pop()}</span>
        </div>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
