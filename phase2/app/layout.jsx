import { SpeedInsights } from '@vercel/speed-insights/next';
export const metadata = {
  title: "Vendora",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}
      <SpeedInsights/></body>
    </html>
  );
}
