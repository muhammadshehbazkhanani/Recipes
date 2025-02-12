import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "Meals",
  description: "Discover and organize your weekly meal plans effortlessly. Browse a variety of meals, add them to different weeks, and manage your meal schedule with ease.",
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
      <body style={{ fontFamily: poppins.style.fontFamily, backgroundColor: "white" }}>
        {children} {/* Only static content here */}
      </body>
    </html>
  );
}
