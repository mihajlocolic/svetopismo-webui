"use client"

import { useState, useEffect } from "react"
import { getBookChapters, getBooks } from "../lib/api"

interface Book {
    bookId: number;
    bookName: string;
}

interface Chapter {
    chapterId: number,
    chapterNumber: number,
    bookId: number,
    translationId: number,
    verses: string;
}


export default function BookList() {

    const [books, setBooks] = useState<Book[]>([]);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    useEffect(() => {
        
        getBooks().then((data) => {
            
            setBooks(data);
            console.log(data);
        })
        
    }, []);


    async function handleBookSelect(bookId:number) {
        console.log(`Looking up chapters for book ID ${bookId}`);

        getBookChapters(bookId).then((data) => {
            if(data) {
                console.log(data);
                setChapters(data);
            } else {
                console.log("No chapters found for this book.");
            }
            
        });
    }

    return (
        <div className="flex max-h-max flex-col bg-red-900 rounded-md p-2">
            <h3 className="text-4xl">Књиге</h3>
            <ul className="flex flex-col gap-1 text-xl">
               {books.map((book) => (
                <li key={book.bookId} onClick={async () => handleBookSelect(book.bookId)}>{book.bookName}</li>
               ))}
            </ul>
        </div>
    )
}   