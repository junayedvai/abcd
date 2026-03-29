import "./globals.css";

export const metadata = {
  title: "GlobalDock",
  description: "Trusted global digital products"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
