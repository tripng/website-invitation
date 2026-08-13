export default function FloralBloom({ size = 120, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="var(--color-gold)" strokeWidth="1.2" strokeLinecap="round">
        <path d="M60 60 C60 40 60 24 60 14" />
        <path d="M60 60 C72 52 86 48 96 44" />
        <path d="M60 60 C48 52 34 48 24 44" />
        <path d="M60 60 C68 72 72 86 76 96" />
        <path d="M60 60 C52 72 48 86 44 96" />
      </g>
      <g
        stroke="var(--color-gold)"
        strokeWidth="0.8"
        fill="none"
        opacity="0.7"
      >
        <ellipse cx="60" cy="22" rx="6" ry="11" />
        <ellipse cx="92" cy="46" rx="11" ry="6" transform="rotate(38 92 46)" />
        <ellipse cx="28" cy="46" rx="11" ry="6" transform="rotate(-38 28 46)" />
        <ellipse cx="76" cy="90" rx="6" ry="11" transform="rotate(28 76 90)" />
        <ellipse cx="44" cy="90" rx="6" ry="11" transform="rotate(-28 44 90)" />
      </g>
      <circle cx="60" cy="60" r="4" fill="var(--color-gold)" />
    </svg>
  );
}
