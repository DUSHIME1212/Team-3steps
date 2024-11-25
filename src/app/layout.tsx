import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "3steps",
  description:
    "Welcome to 3steps, a Next.js project designed to assist individuals in finding their perfect home. This project leverages the power of Next.js to provide a seamless user experience, ensuring that users can easily navigate through the website and find the properties that best suit their needs.",
    icons: [{ rel: "icon", url: "/3steps.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-dmsans scroll-smooth antialiased`}
      >
        <nav>
          <Navbar />
        </nav>
        <AntdRegistry>{children}</AntdRegistry>
        <Footer />
      </body>
    </html>
  );
}
