'use client';

import { useState } from 'react';
import { searchVerses } from "../lib/api";
import Pagination from './Pagination';

interface Verse {
    id: number,
    verseNumber: number,
    verseText: string,
    bookId: number,
    chapterNumber: number,
    chapterId: number,
    bookName: string
}

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [verses, setVerses] = useState<Verse[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    async function handleSearch() {
        if(!search.trim()) return;
        
        searchVerses(search).then((data) => {console.log(data); setVerses(data);});
    }

    return (
        <div>
            <div className="flex items-center justify-center gap-2">
                <input
                    type="text"
                    placeholder="Претражи стихове..."
                    className="flex-1 rounded-md border border-white-300 px-4 py-2 focus:border-red-500 focus:ring focus:ring-red-100 focus:ring-opacity-50"
                    id="searchInput"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="rounded-md bg-red-950 px-4 py-2 text-white hover:bg-red-900 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50"
                onClick={() => handleSearch()}
                >
                    Претражи
                </button>
            </div>
            <div className="flex-1 flex-col gap-4 rounded-md p-4">
                <h3 className="text-2xl p-4">{verses.length < 1 ? "" : "Резултати претраге: " + verses.length + " стихова."}</h3>
                <Pagination currentPage={currentPage} totalPages={Math.ceil(verses.length / 10)} onPageChange={(page) => setCurrentPage(page)} />
                <div className="flex flex-col gap-2 text-2xl">
                    {verses.slice(currentPage * 10, (currentPage + 1) * 10).map(verse => (
                        <div key={verse.id} className="searchResult rounded-md border border-gray-300 p-4">
                            <h4 className="text-lg font-semibold">{verse.bookName} {verse.chapterNumber}:{verse.verseNumber}</h4>
                            <p>{verse.verseText}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    )
}