import * as searchController from "./searchController";
import Observable from "../utils/observable";

const bookResultsObserver = new Observable();
const maxResults = 6;

const mapBooksProperties = book => {
    const takeFirstOfArray = prop => Array.isArray(prop) ? prop[0] : prop;

    return {
        title: takeFirstOfArray(book.title),
        author: takeFirstOfArray(book.author_name),
        id: book.cover_edition_key
    }
};

const generateNewBooksResults = (books, query) => {
    // notify about 'no search results'
    if (!books.length) {
        bookResultsObserver.notify([]);
        return;
    }

    const bookResults = [];

    const bookHasNecessaryData = book => {
        // important check with regex - some books do not contain in title the searched query
        const queryRegex = new RegExp(query, 'i');
        const {title, cover_edition_key, author_name} = book;

        return title.match(queryRegex) && title && cover_edition_key && author_name;
    };

    const shouldAddMoreBooks = i => i < books.length && bookResults.length < maxResults;

    for (let i = 0; shouldAddMoreBooks(i); i++) {
        const book = books[i];
        if (book && bookHasNecessaryData(book)) {
            bookResults.push(mapBooksProperties(book));
        }
    }

    bookResultsObserver.notify(bookResults);
};

const getBooks = query => {
    searchController.toggleSpinner();
    fetch(`http://openlibrary.org/search.json?title=${query}`)
        .then(res => res.json())
        .then(books => generateNewBooksResults(books.docs, query))
        .finally(() => searchController.toggleSpinner())
        .catch((err) => {
            console.log('Error while fetching data!', err)
        })
};

export {getBooks, bookResultsObserver}