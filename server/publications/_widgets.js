import {Widgets} from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('_widgets.list', function () {
    const selector = {};
    const options = {
      fields: {_id: 1, title: 1},
      sort: {createdAt: -1},
      limit: 10
    };

    return Widgets.find(selector, options);
  });

  Meteor.publish('_widgets.single', function (_id) {
    check( _id, String);
    const selector = {_id};
    const response = Widgets.find(selector);
    // console.log('publish _widgets.single _id', _id);
    // console.log('publish _widgets.single response.title', response.title);
    return response;
  });
}
