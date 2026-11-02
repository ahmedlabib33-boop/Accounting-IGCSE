// Brand mark: an "MB" monogram for Mohamed Basiouny. The M's right leg is also the B's spine.
export function BrandMark({ size = 42 }) {
  return <svg className="brand-mark" width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="brand-mark-stroke" x1="8" y1="10" x2="40" y2="38" gradientUnits="userSpaceOnUse"><stop stopColor="#c4b5fd"/><stop offset=".55" stopColor="#8b5cf6"/><stop offset="1" stopColor="#22d3ee"/></linearGradient>
      <linearGradient id="brand-mark-edge" x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse"><stop stopColor="#8b5cf6" stopOpacity=".9"/><stop offset="1" stopColor="#22d3ee" stopOpacity=".9"/></linearGradient>
    </defs>
    <rect x="1.75" y="1.75" width="44.5" height="44.5" rx="14" fill="#120f26" stroke="url(#brand-mark-edge)" strokeWidth="1.5"/>
    <path d="M10.5 34V14l8.25 11.5L27 14v20M27 14h5.25a4.75 4.75 0 0 1 0 9.5H27M27 23.5h6a5.25 5.25 0 0 1 0 10.5h-6" stroke="url(#brand-mark-stroke)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
