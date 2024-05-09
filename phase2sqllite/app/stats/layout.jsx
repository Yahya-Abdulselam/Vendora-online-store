import "../globals.css";

export const metadata = {
  title: "statistics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
