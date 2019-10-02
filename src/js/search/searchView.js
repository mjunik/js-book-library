import * as searchController from './searchController';

const searchInput = document.getElementById('jsSearchInput');
const resultsWrapper = document.getElementById('jsSearchResults');

const toggleSpinner = () => {
    const spinnerElement = document.getElementById('jsSpinner');
    spinnerElement.classList.toggle('show');
};

const hideBookResults = () => {
    resultsWrapper.innerHTML = '';
};

const resetSearchForm = () => {
    searchInput.value = '';
};

const displayBookResults = books => {
    hideBookResults();

    const titleWithHighlightedQuery = title => {
        const query = searchInput.value;
        const queryRegex = new RegExp(query, 'i');

        const matchStartPosition = title.match(queryRegex).index;
        const matchEndPosition = matchStartPosition + query.length;
        const textFoundByRegex = title.substring(matchStartPosition, matchEndPosition);

        return title.replace(queryRegex, `<span class="highlighted">${textFoundByRegex}</span>`);
    };

    const addBooksItems = () => {
        books.forEach(book => {
            const el = document.createElement('li');
            const title = titleWithHighlightedQuery(book.title);
            el.dataset.id = book.id;
            el.innerHTML = `${title} <span class="author">${book.author}</span>`;
            resultsWrapper.appendChild(el);
        });
    };

    const addNoResultsItem = () => {
        const el = document.createElement('li');
        el.classList.add('no-results');
        el.innerHTML = `No results`;
        resultsWrapper.appendChild(el);
    };

    if (books.length) {
        addBooksItems();
        searchController.addBooksResultsListeners();
    } else {
        addNoResultsItem();
    }
};

export {
    displayBookResults,
    hideBookResults,
    toggleSpinner,
    resetSearchForm
}