import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';

export const _widgets = new Mongo.Collection('_widgets');

export const Widget = Class.create({

  name: 'Widget',
  collection: _widgets,
  fields: {
    title: String,
    size: Number,
    content: String,
  },
  helpers: {
    fullText() {
      var full = this.title + ' ' + this.content;
      return full;
    }
  },
  behaviors: {
    softremove: {
      // The field name with a flag for marking a document as removed.
      removedFieldName: 'removed',
      // A flag indicating if a "removedAt" field should be present in a document.
      hasRemovedAtField: true,
      // The field name storing the removal date.
      removedAtFieldName: 'removedAt'
    }
  }
});
