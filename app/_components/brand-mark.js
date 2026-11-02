// Brand mark: a "BA" monogram for Bassem Ashraf, drawn as one gradient stroke on a dark tile.
export function BrandMark({ size = 42 }) {
  return <svg className="brand-mark" width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="brand-mark-stroke" x1="8" y1="10" x2="40" y2="38" gradientUnits="userSpaceOnUse"><stop stopColor="#c4b5fd"/><stop offset=".55" stopColor="#8b5cf6"/><stop offset="1" stopColor="#22d3ee"/></linearGradient>
      <linearGradient id="brand-mark-edge" x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse"><stop stopColor="#8b5cf6" stopOpacity=".9"/><stop offset="1" stopOpacity=".9" stopColor="#22d3ee"/></linearGradient>
    </defs>
    <rect x="1.75" y="1.75" width="44.5" height="44.5" rx="14" fill="#120f26" stroke="url(#brand-mark-edge)" strokeWidth="1.5"/>
    <path d="M10.5 33V14h6a4.5 4.5 0 0 1 0 9H10.5M10.5 23h6.5a5 5 0 0 1 0 10h-6.5M25 34l7.5-20 7.5 20M27.4 27.5h10.2" stroke="url(#brand-mark-stroke)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
