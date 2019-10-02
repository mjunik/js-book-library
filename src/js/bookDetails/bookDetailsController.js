import * as appController from '../../app';
import * as bookDetailsModel from './bookDetailsModel';
import * as bookDetailsView from './bookDetailsView';

const subscribeToBookDetails = () => {
    bookDetailsModel.bookDetailsObserver.subscribe(appController.updateLastSearchList);
    bookDetailsModel.bookDetailsObserver.subscribe(bookDetailsView.displayBookDetails);
};

const displayBookDetails = id => bookDetailsModel.getBookDetails(id);

setTimeout(() => subscribeToBookDetails(), 0);

export {displayBookDetails, subscribeToBookDetails}