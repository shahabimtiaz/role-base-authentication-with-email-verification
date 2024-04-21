import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from "@provider";
const poppins = Poppins({ subsets: ["latin"],weight:'500' });

export const metadata: Metadata = {
  title: "Authentication",
  description: "Role base authentication with email verification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    
    <html lang="en">
      
      <body className={poppins.className}>
        <ReduxProvider>
      <Header/>
      <ToastContainer/>
      
        {children}
        </ReduxProvider>
        </body>
    </html>
  );
}
