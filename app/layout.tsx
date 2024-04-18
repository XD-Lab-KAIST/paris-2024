import Script from "next/script";

import type { Metadata } from "next";

import StyledComponentsRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: "Uncharted Territory",
  description: "Experimental Interactive Artwork by Experience Design Lab (Yiyun Kang, Jeanyoon Choi), Department of Industrial Design, KAIST.",
  openGraph: {
    type: "website",
    locale: "en_UK",
    url: "paris-xdlab-2024.vercel.app",
    siteName: "Uncharted Territory",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <link rel="icon" href="/icons/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/icons/favicon.ico" />

          <link rel="manifest" href="/icons/site.webmanifest" />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </head>

        <body suppressHydrationWarning={true}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </html>
    </>
  );
}
