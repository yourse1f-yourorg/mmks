import React from 'react';

const BookList = ({book}) => (
  <div className='bookList'>
    <ul>
      {book.map(aBook => (
        <li key={aBook._id}>
          <a href={`/aBook/${aBook._id}`}>{aBook.title}</a>  written by <a href={`/aBook/${aBook.author._id}`}>{aBook.author.lastName}, {aBook.author.firstName}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default BookList;
