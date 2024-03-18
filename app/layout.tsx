import Script from "next/script";
import StyledComponentsRegistry from "@/lib/registry";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </html>
    </>
  );
}
