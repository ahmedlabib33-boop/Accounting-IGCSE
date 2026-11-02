import "./globals.css";

export const metadata = {
  title: "IGCSE Accounting | Cambridge (0452)",
  description: "Mr. Mohamed Basiouny",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
