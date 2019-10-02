import errorImage from '../../images/error.jpg'

const bookDetailsContainer = document.getElementById('jsBookDetails');

const displayDetails = book => {
    const generateSubjects = subjects => {
        let subjectsElements = '';
        subjects.forEach(subj => subjectsElements += `<span class="subject">${subj}</span>`);
        return subjectsElements;
    };

    bookDetailsContainer.innerHTML = `
        <h2 class="book-title">${book.title}</h2>
        <div class="book-details-wrapper">
            <div class="book-cover">
                <img src="${book.coverUrl}" width="180" height="300" alt="${book.title} cover" />
            </div>
            <div class="book-details">
                <p><b>Author: </b>${book.author}</p>
                <p><b>Number of pages: </b>${book.pages}</p>
                <p><b>Publish date: </b>${book.publish.date}</p>
                <p><b>Publisher: </b>${book.publish.company}</p>
                <p><b>ISBN: </b>${book.isbn}</p>
                ${generateSubjects(book.subjects)}
            </div>
        </div>
    `;
};

const displayErrorMsg = () => {
    bookDetailsContainer.innerHTML = `
        <img src="${errorImage}" class="float-right" width="250" alt="Error image" />
        <h2 class="error-title">Upsss...<br/>something went wrong</h2>
        <p>Maybe try with another book?</p>
    `;
};

const displayBookDetails = book => book ? displayDetails(book) : displayErrorMsg();

export {displayBookDetails}