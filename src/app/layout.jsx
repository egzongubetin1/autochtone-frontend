import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "../layout/footer/Footer";
import Header from "../layout/navigation/Header";
import { Providers } from "../redux/provider";
import { Toaster } from "../components/ui/toaster";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
 title: "Autochtone",
 description: "Win the best prizes!",
};

export default function RootLayout({ children }) {
 return (
  <html lang="en">
   <body className={inter.className}>
    <Providers>
     <>
      <Header />
      <div className="mt-[70px] md:mt-[80px]">{children}</div>
      <Footer />
     </>
    </Providers>
    <Toaster />
    <NextTopLoader color="rgb(50, 101, 184)" />
   </body>
  </html>
 );
}
