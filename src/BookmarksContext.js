import React from 'react'

const BookmarksContext = React.createContext({
  bookmarks: [],
  addBookmark: () => {},
  deleteBookmark: () => {},
  updateBookmarks: () => {},
});

export default BookmarksContext
