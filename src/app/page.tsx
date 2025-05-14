import Image from "next/image";
import PasskeyWallet from '@/components/PasskeyWallet';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Stellar Passkey Demo</h1>
        <PasskeyWallet />
      </div>
    </main>
  );
}
