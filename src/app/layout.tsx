import type { Metadata } from "next";
import { Passion_One, Poppins, Quicksand } from "next/font/google";
import "./globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400", "700"],
  variable: "--font-poppins",
  display: "swap"
});

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-quicksand",
  display: "swap"
});

const passionOne = Passion_One({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-passion-one",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Skillz-Powered Games | eSports for Everyone",
  description: "Embrace your inner champion and compete for real prizes in your favorite mobile game genres. Download Skillz games now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${quickSand.variable} ${passionOne.variable} root`}>
        {children}
      </body>
    </html>
  );
}
