import * as searchController from './js/search/searchController';
import * as bookDetailsController from './js/bookDetails/bookDetailsController'
import * as lastSearchController from './js/lastSearch/lastSearchController'
import './styles.css';

const displayBookDetails = id =>
    bookDetailsController.displayBookDetails(id);

const updateLastSearchList = book =>
    lastSearchController.updateLastSearch(book);


searchController.initSearch();

lastSearchController.setLastSearchFromLocalStorage();

export {displayBookDetails, updateLastSearchList}