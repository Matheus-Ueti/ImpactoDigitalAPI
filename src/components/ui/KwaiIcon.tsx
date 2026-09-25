import type { SVGProps } from 'react';

export default function KwaiIcon({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 13.5L9 12l6.5-3.5v7z" />
      <path d="M16.5 8.5l-1.5.8V7l1.5 1.5zM16.5 15.5L15 14.7V17l1.5-1.5z" />
    </svg>
  );
}
