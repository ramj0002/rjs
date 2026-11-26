// The little flower mark, redrawn as SVG.
export const PETAL = "M50 42 C 39 32, 39 13, 50 4 C 61 13, 61 32, 50 42 Z";

export default function Flower({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinejoin="round"
      aria-hidden
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
        <path key={r} d={PETAL} transform={`rotate(${r} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="5" fill="currentColor" stroke="none" />
    </svg>
  );
}
