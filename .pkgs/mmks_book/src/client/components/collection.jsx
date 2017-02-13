import React from 'react';

/* ***************************************
             BookList Component
   ***************************************/

const BookList = ({book}) => (
  <div className='bookList'>
    <h3>Books list</h3>
    <ul>
      {book.map(aBook => (
        <li key={aBook._id}>
          <a data-cuke={aBook.title} href={`/book/${aBook._id}`}>{aBook.title} </a>
            written by
          <a href={`/books/${aBook.author._id}`}>&nbsp;
             {aBook.author.lastName}, {aBook.author.firstName}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default BookList;
