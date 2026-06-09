import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { LayoutShell } from "@/components/safar/LayoutShell";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Safar — Digital Museum Guide of the Silk Road",
  description:
    "Premium digital companion for exploring Tashkent, Samarkand, Bukhara, Khiva, and Surkhandarya. GPS-triggered audio, museum-quality content.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const theme: "light" | "dark" = themeCookie === "light" ? "light" : "dark";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${theme} ${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      style={{ colorScheme: theme }}
    >
      <body className="min-h-full flex flex-col">
        <Providers initialTheme={theme}>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
