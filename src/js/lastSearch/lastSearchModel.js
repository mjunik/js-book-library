const lastSearchBooks = [];
const maxShown = 3;

const addBookToList = book => {
    if (!book) return;

    if (!lastSearchBooks.some(item => item.id === book.id)) {
        lastSearchBooks.unshift(book);

        if (lastSearchBooks.length > maxShown) {
            lastSearchBooks.splice(-1, 1);
        }
    }
};

const getLastSearchBooks = () => lastSearchBooks;

export {addBookToList, getLastSearchBooks}