const displayLastSearch = books => {
    const lastSearchContainer = document.getElementById('jsLastSearch');
    lastSearchContainer.innerHTML = '';

    books.forEach(book => {
        const item = document.createElement('div');
        item.classList.add('last-search-item');
        item.dataset.id = book.id;
        item.innerHTML = `
            <img src="${book.coverUrl}" 
                class="book-cover small-cover" 
                width="80" height="120"
                alt="${book.title} cover"/>
                
            <div>
                <h4 class="title">${book.title}</h4>
                <p class="author">${book.author}</p>
            </div>
        `;
        lastSearchContainer.appendChild(item);
    });
};

export {displayLastSearch}