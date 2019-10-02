import * as appController from '../../app'
import * as searchModel from "./searchModel";
import * as searchView from "./searchView";
import debounce from "../utils/debounce";

const searchInput = document.getElementById('jsSearchInput');

const toggleSpinner = () => searchView.toggleSpinner();

const hideBookResults = () => searchView.hideBookResults();

function searchBooks() {
    const query = this.value;
    query.length > 2 ? searchModel.getBooks(query) : hideBookResults();
}

const hideBookResultsIfClickedOutside = e => {
    const searchEngineWrapper = document.querySelector('.search-engine');
    if (!e.path.includes(searchEngineWrapper)) {
        hideBookResults();
        searchInput.value = '';
    }
};

const addBooksResultsListeners = () => {
    const resultsItems = document.querySelectorAll('#jsSearchResults li');
    resultsItems.forEach(item =>
        item.addEventListener('click', e => {
            const listElement = e.target.closest('li');
            const id = listElement.dataset.id;
            appController.displayBookDetails(id);
            searchView.hideBookResults();
            searchView.resetSearchForm();
        }));
};

const initSearch = () => {
    searchInput.addEventListener('input', debounce(searchBooks, 250));
    window.addEventListener('click', hideBookResultsIfClickedOutside);
    searchModel.bookResultsObserver.subscribe(searchView.displayBookResults);
};

export {
    initSearch,
    toggleSpinner,
    hideBookResults,
    addBooksResultsListeners
}