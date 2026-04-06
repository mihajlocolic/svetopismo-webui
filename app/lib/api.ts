const API_URL = process.env.API_URL || 'http://localhost:5034/api';

export async function getBooks() {
    const res = await fetch(`${API_URL}/books`);
    if(!res.ok) throw new Error("Failed to fetch books from the API.");
    return res.json();
}

export async function searchVerses(input:string) {
    const res = await fetch(`${API_URL}/verses/search?verseText=${input}`);
    if(!res.ok) throw new Error("Failed to fetch verse search results from the API.");
    return res.json();
}

export async function getBookChapters(id:number) {
    const res = await fetch(`${API_URL}/books/${id}`);
    if(!res.ok) throw new Error("Failed to fetch book chapters from the API.");
    const data = await res.json();
    return data;
}

export async function getChapter(chapterId:number) {
    const res = await fetch(`${API_URL}/chapters/${chapterId}`);
    if(!res.ok) throw new Error("Failed to fetch chapter details from the API.");
    return res.json();
}