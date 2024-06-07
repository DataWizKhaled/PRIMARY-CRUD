window.onload = function() {
    fetchBookmarks();
};

document.getElementById('bookmarkForm').addEventListener('submit', function(e) {
    saveBookmark(e);
    fetchBookmarks();
}); 

function saveBookmark(e) {
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    var bookmark = {
        name: siteName,
        url: siteURL
    };

    var bookmarks;
    if (localStorage.getItem('bookmarks') === null) {
        bookmarks = [];
    } else {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    document.getElementById('bookmarkForm').reset();

    e.preventDefault();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksList = document.getElementById('bookmarksList');
    bookmarksList.innerHTML = '';

    for (var i = 0; bookmarks && i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        bookmarksList.innerHTML += '<tr><td>' + (i + 1) + '</td><td>' + bookmark.name + '</td><td><a href="' + bookmark.url + '" class="btn btn-primary" target="_blank">Visit</a></td><td><button class="btn btn-danger" onclick="deleteBookmark(\'' + bookmark.url + '\')">Delete</button></td></tr>';
    }
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var updatedBookmarks = [];

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url !== url) {
            updatedBookmarks.push(bookmarks[i]);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    fetchBookmarks();
}
