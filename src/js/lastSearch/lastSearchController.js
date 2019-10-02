import * as appController from '../../app';
import * as lastSearchModel from './lastSearchModel'
import * as lastSearchView from './lastSearchView'

function displayBookDetails() {
    const id = this.dataset.id;
    appController.displayBookDetails(id);
}

const updateLastSearch = book => {
    lastSearchModel.addBookToList(book);

    const lastSearchBooks = lastSearchModel.getLastSearchBooks();

    lastSearchView.displayLastSearch(lastSearchBooks);

    const lastSearchItems = document.querySelectorAll('.last-search-item');
    lastSearchItems.forEach(item => item.addEventListener('click', displayBookDetails));
};

export {updateLastSearch}