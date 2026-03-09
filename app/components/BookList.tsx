"use client"

import { useState, useEffect } from "react"
import { getBooks } from "../lib/api"

interface Book {
    id: number;
    bookName: string;
}

export default function BookList() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        
        getBooks().then((data) => {
            if(!data) return;
            
            setBooks(data);
        })
        
    }, []);

    
    return (
        <div className="flex max-h-max flex-col bg-red-900 rounded-md p-2">
            <h3 className="text-4xl">Књиге</h3>
            <ul className="flex flex-col gap-1 text-xl">
               {books.map((book) => (
                <li key={book.id}>{book.bookName}</li>
               ))}
            </ul>
        </div>
    )
}   