import bookModule from './client';
import { Book } from './lib';
import { methods, publications } from './server';

export const Client = bookModule;

export const Lib = Book;

export const Publications = publications;
export const Methods = methods;
