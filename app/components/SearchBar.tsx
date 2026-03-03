'use client';

import { useState, useEffect } from 'react';
import { searchVerses } from "../lib/api";

interface Verse {
    id: number,
    verseNumber: number,
    verseText: string,
    chapterNumber: number,
    chapterId: number,
    bookId: number
}

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [verses, setVerses] = useState<Verse[]>([]);

    useEffect(() => {
        searchVerses(search).then((data) => setVerses(data));
    })
    return (
        <div>
            <div className="flex items-center justify-center gap-2">
                <input
                    type="text"
                    placeholder="Претражи стихове..."
                    className="flex-1 rounded-md border border-white-300 px-4 py-2 focus:border-red-500 focus:ring focus:ring-red-100 focus:ring-opacity-50"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="rounded-md bg-red-950 px-4 py-2 text-white hover:bg-red-900 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50">
                    Претражи
                </button>
            </div>
            <div className="flex-1 flex-col gap-4 rounded-md p-4">
                <h3 className="text-2xl p-4">Резултати претраге</h3>
                <div className="flex flex-col gap-2 text-2xl">
                    {verses.map(verse => (
                        <div key={verse.id} className="searchResult rounded-md border border-gray-300 p-4">
                            <h4 className="text-lg font-semibold">{verse.chapterNumber}:{verse.verseNumber}</h4>
                            <p>{verse.verseText}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    )
}