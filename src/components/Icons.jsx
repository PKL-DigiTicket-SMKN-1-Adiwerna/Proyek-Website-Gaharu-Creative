/*
 * Kumpulan ikon linear, satu gaya, stroke 1.5, viewBox 24. Semua currentColor
 * supaya ikut warna teks. Di tahap wireframe warna hanya hitam dan abu,
 * jadi satu keluarga ikon lebih dari cukup.
 *
 * Nama baru ditulis dalam LOWERCASE_PASCAL: tambah path di bawah lalu
 * daftarkan di `paths`.
 */
const paths = {
  brand: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v3" />
    </>
  ),
  content: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
    </>
  ),
  social: (
    <>
      <circle cx="7" cy="12" r="2.5" />
      <circle cx="17" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="M9.2 10.8l5.6-2.6" />
      <path d="M9.2 13.2l5.6 2.6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 15l3-4 3 2 4-6" />
    </>
  ),
  code: (
    <>
      <path d="M9 8l-4 4 4 4" />
      <path d="M15 8l4 4-4 4" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 8a3 3 0 010 4" />
      <path d="M18 19a5.9 5.9 0 00-2-4.5" />
    </>
  ),
  tech: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M10 2v4M14 2v4M10 18v4M14 18v4M2 10h4M2 14h4M18 10h4M18 14h4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l4 4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l8 5-8 5-8-5 8-5z" />
      <path d="M4 13l8 5 8-5" />
    </>
  ),
  store: (
    <>
      <path d="M4 9h16v11H4z" />
      <path d="M4 9l2-5h12l2 5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
    </>
  ),
  landmark: (
    <>
      <path d="M4 10h16" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
      <path d="M12 3l7 5H5l7-5z" />
      <path d="M4 21h16" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <path d="M12 4c2.5 2.5 2.5 13 0 16" />
      <path d="M12 4c-2.5 2.5-2.5 13 0 16" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H9l-5 4V5z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-6.3 6-11a6 6 0 00-12 0c0 4.7 6 11 6 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M15 9l-2 4-4 2 2-4 4-2z" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 16h4" />
    </>
  ),
  contract: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8M8 13h5" />
      <path d="M14 17l2 2 3-4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4 12h14" />
      <path d="M13 7l5 5-5 5" />
    </>
  ),
  chevronDown: <path d="M6 9l6 6 6-6" />,
  check: <path d="M5 13l4 4 10-10" />,
};

export const iconNames = Object.keys(paths);

export function Icon({ name, className = "", strokeWidth = 1.5 }) {
  const shape = paths[name];
  if (!shape) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {shape}
    </svg>
  );
}
