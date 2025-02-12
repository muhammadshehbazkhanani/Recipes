import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meals Receipes",
  description: "Explore Racket Hub for top-quality rackets, sports gear, and accessories...",
  icons: { icon: "/favicon.ico" },
  robots: "index, follow",
};

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
        <meta name="robots" content={metadata.robots} />
      </head>
      <body style={{ fontFamily: inter.style.fontFamily, backgroundColor: "black" }}>
        {children}
      </body>
    </html>
  );
}
