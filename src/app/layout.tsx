import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { KeyIdProvider } from "@/store/keyId";
import { ContractIdProvider } from "@/store/contractId";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stellar Passkey Demo",
  description: "A demo of Stellar Passkey-kit using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KeyIdProvider>
          <ContractIdProvider>
            {children}
          </ContractIdProvider>
        </KeyIdProvider>
      </body>
    </html>
  );
}
