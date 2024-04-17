import { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import Main from "./components/main";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Speech AI",
  description: "automatic speech to text recognition",
}


export default function Home() {

  return (
         <main className="min-h-screen flex place-items-center min-w-full">
               <Main />
         </main>
  );
}
