import Observable from "../utils/observable";

const lastSearchBooks = [];
const lastSearchObserver = new Observable();
const maxShown = 3;
const localStorageKey = 'js-book-library-last-search';

const updateLocalStorageList = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(lastSearchBooks));
};

const setLastSearchFromLocalStorage = () => {
    const lastSearchLocalStorage = JSON.parse(localStorage.getItem(localStorageKey));
    lastSearchBooks.push(...lastSearchLocalStorage);
    lastSearchObserver.notify(lastSearchBooks);
};

const addBookToList = book => {
    if (!book) return;

    if (!lastSearchBooks.some(item => item.id === book.id)) {
        lastSearchBooks.unshift(book);

        if (lastSearchBooks.length > maxShown) {
            lastSearchBooks.splice(-1, 1);
        }

        updateLocalStorageList();
        lastSearchObserver.notify(lastSearchBooks);
    }
};

export {addBookToList, setLastSearchFromLocalStorage, lastSearchObserver}