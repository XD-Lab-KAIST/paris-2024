import Script from "next/script";

import type { Metadata } from "next";

import StyledComponentsRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: "Uncharted Territory",
  description: "Experimental Interactive Artwork by Experience Design Lab (Dr. Yiyun Kang, Jeanyoon Choi), Department of Industrial Design, KAIST.",
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
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KGLLKKBZ');`}
          </Script>

          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/favicon.ico" />

          <link rel="manifest" href="/icons/site.webmanifest" />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </head>

        <body suppressHydrationWarning={true}>
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KGLLKKBZ" height="0" width="0" style="display:none;visibility:hidden"></iframe>
          </noscript>

          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </html>
    </>
  );
}
