import "./globals.css";

export const metadata = {
  title: "NextJS Project",
  description: "My first NextJS app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
