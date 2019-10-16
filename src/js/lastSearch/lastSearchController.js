import * as appController from '../../app';
import * as lastSearchModel from './lastSearchModel'
import * as lastSearchView from './lastSearchView'

function displayBookDetails() {
    const id = this.dataset.id;
    appController.displayBookDetails(id);
}

const updateLastSearch = book => lastSearchModel.addBookToList(book);

const displayLastSearch = lastSearchData => {
    lastSearchView.displayLastSearch(lastSearchData);

    const lastSearchItems = document.querySelectorAll('.last-search-item');
    lastSearchItems.forEach(item =>
        item.addEventListener('click', displayBookDetails));
};

const setLastSearchFromLocalStorage = () =>
    lastSearchModel.setLastSearchFromLocalStorage();

lastSearchModel.lastSearchObserver.subscribe(displayLastSearch);

export {updateLastSearch, setLastSearchFromLocalStorage}