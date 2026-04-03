"use client"

import { useState, useEffect } from "react"
import { getBookChapters, getBooks, getChapter } from "../lib/api"

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
    const [book, setBook] = useState<Book | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

    useEffect(() => {
        
        getBooks().then((data) => {
            
            setBooks(data);
            console.log(data);
        })
        
    }, []);


    async function handleBookSelect(Book: Book) {
        console.log(`Looking up chapters for book ID ${Book.bookId}`);
        setBook(Book);
        setSelectedChapter(null);

        getBookChapters(Book.bookId).then((data) => {
            if(data) {
                console.log(data);
                setChapters(data);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {

                console.log("No chapters found for this book.");
            }
            
        });
    }

    async function handleChapterSelect(chapter: Chapter) {
        getChapter(chapter.chapterNumber).then((data) => {
            if(data) {
                console.log(data);
                setSelectedChapter(data);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                console.log("No details found for this chapter.");
            }
        });
    }

    async function handleBookDeselect() {
        setBook(null);
        setChapters([]);
        setSelectedChapter(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    
    return (
        <div className="flex max-h-max flex-col bg-red-900 rounded-md p-2">
            
            {chapters && (
                <div className="flex flex-col gap-1">
                    {book && ( <h3 className="text-3xl">{book.bookName} - поглавља</h3>)}
                    <ul className="flex flex-wrap flex-row text-2xl gap-2 w-100">
                        {chapters.map((chapter) => (
                            <li className="chapterItem" key={chapter.chapterId} onClick={() => handleChapterSelect(chapter)}>{` ${chapter.chapterNumber} `}</li>
                        ))}
                        {book && (<li id="deselectButton" className="rounded-md bg-red-950 px-2 py-2 text-white text-xl hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 select-none" onClick={() => handleBookDeselect()}>Deselect</li>)}
                    </ul>   
                </div>
            )}

            {selectedChapter && (
                <div className="flex flex-col gap-1 w-150">
                    <h3 className="text-3xl">{`Поглавље ${selectedChapter.chapterNumber} - ${book?.bookName}`}</h3>
                    <p className="text-xl">{selectedChapter.verses}</p>
                </div>
            )}

            <h3 className="text-4xl">Књиге</h3>
            <ul className="flex flex-col gap-1 text-xl">
               {books.map((book) => (
                <li className="bookItem" key={book.bookId} onClick={async () => handleBookSelect(book)}>{book.bookName}</li>
               ))}
            </ul>
        </div>
    )
}   