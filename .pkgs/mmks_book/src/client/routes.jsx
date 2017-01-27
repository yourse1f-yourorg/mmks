import React from 'react';
import {mount} from 'react-mounter';

import Utils from '../utils';

import BookList from './containers/collection.js';
import BooksView from './containers/single.js';
import BooksAdd from './containers/add.js';
import BooksEdit from './containers/edit.js';

export default function (injectDeps, {FlowRouter}) {

  const LayoutDefaultCtx = injectDeps(Utils.LayoutDefault);

  FlowRouter.route('/books', {
    name: '_books.booksList',
    action() {
      mount(LayoutDefaultCtx, {
        content: () => (<BookList />)
      });
    }
  });

  FlowRouter.route('/books/add', {
    name: '_books.booksAdd',
    action() {
      mount(LayoutDefaultCtx, {
        content: () => (<BooksAdd />)
      });
    }
  });

  FlowRouter.route('/books/:_id', {
    name: '_books.booksView',
    action({_id}) {
      mount(LayoutDefaultCtx, {
        content: () => (<BooksView _id={_id}/>)
      });
    }
  });

  FlowRouter.route('/books/:_id/edit', {
    name: '_books.booksEdit',
    action({_id}) {
      mount(LayoutDefaultCtx, {
        content: () => (<BooksEdit _id={_id}/>)
      });
    }
  });

}
