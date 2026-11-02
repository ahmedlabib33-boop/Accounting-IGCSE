export default function manifest() {
  return {
    name: "IGCSE Accounting | Cambridge (0452)",
    short_name: "Accounting 0452",
    description: "Lessons, daily practice, mocks and an AI coach for Cambridge IGCSE Accounting (0452), by Mr. Bassem Ashraf.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#07060f",
    theme_color: "#07060f",
    categories: ["education"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
