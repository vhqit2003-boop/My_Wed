import "./globals.css";

export const metadata = {
  title: "Vũ Hải Quân — Portfolio",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="min-h-screen selection:bg-violet-500/30 theme-dark">
        {children}
      </body>
    </html>
  );
}
