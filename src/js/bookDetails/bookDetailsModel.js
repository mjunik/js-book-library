import Observable from "../utils/observable";

const bookDetailsObserver = new Observable();

const mapBookDetails = (details, id) => {
    const getSubjects = subj => {
        if (!subj) return [];

        const subjects = [];
        const maxSubjects = 7;
        for (let i = 0; i < maxSubjects; i++) {
            subjects.push(subj[i].name);
        }
        return subjects;
    };

    const getAuthor = () => details.authors ? details.authors[0].name : '';
    const getIsbn = () => details.identifiers.isbn_13 ? details.identifiers.isbn_13[0] : '';
    const getPublishCompany = () => details.publishers ? details.publishers[0].name : '';

    return {
        id: id,
        title: details.title,
        author: getAuthor(),
        pages: details.number_of_pages,
        isbn: getIsbn(),
        subjects: getSubjects(details.subjects),
        coverUrl: details.cover.medium,
        publish: {
            date: details.publish_date,
            company: getPublishCompany()
        },
    }
};

const generateBookDetails = (details, id) => {
    const bookDetails = mapBookDetails(details, id);
    bookDetailsObserver.notify(bookDetails);
};

const getBookDetails = id => {
    fetch(`https://openlibrary.org/api/books?bibkeys=OLID:${id}&format=json&jscmd=data`)
        .then(res => res.json())
        .then(details => generateBookDetails(details[`OLID:${id}`], id))
        .catch(err => {
            bookDetailsObserver.notify(null);
            console.log('Error while catching book details', err)
        });
};

export {getBookDetails, bookDetailsObserver}