import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Bitcoin Dashboard",
  description: "A Bitcoin dashboard created timbothe.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {children}
        <TailwindIndicator />
      </body>
    </html>
  );
}
