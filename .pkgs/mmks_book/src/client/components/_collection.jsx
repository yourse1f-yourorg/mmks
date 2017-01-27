import React from 'react';

export default ({collection}) => (
  <div>
    <h3>Books list</h3>
    <ul data-cuke="items-list">
      {collection.map(record => (
        <li key={record._id}>
          <a data-cuke={record.title} href={`/books/${record._id}`}>{record.title}</a>
        </li>
      ))}
    </ul>
  </div>
);
