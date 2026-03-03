import { Ponomar } from "next/font/google";
import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";

const ponomar = Ponomar({ subsets: ["cyrillic"], weight: '400' });

export default function Home() {
  return (
    <div className="flex flex-col">
      <h3 className={`nameHeader ${ponomar.className} text-6xl p-4`}>Свето Писмо</h3>
      <div className="flex p-4">
        <div className="flex justify-left p-4">
          <BookList/>
        </div>
        <div className="justify-right flex-1 flex-col p-4 rounded-md">
          <SearchBar/>
        </div>
     </div>
     
      
    </div>
    
  );
}
