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