import { Playfair } from "next/font/google";

const playfair = Playfair({ subsets: ["cyrillic"] });

export default function Home() {
  return (
    <div className="flex">
      <p className={`${playfair.className} text-6xl`}>Свето Писмо</p>
    </div>
  );
}
