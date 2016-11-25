function init( _clsWidgets, _meteor, _check ) {
  // console.log('MMKS Widget :: server/publications/init.js');
  return function () {
    Meteor.publish('_widgets.list', function () {
      const selector = {};
      const options = {
        fields: {_id: 1, title: 1},
        sort: {createdAt: -1},
        limit: 10
      };

      return _clsWidgets.find(selector, options);
    });

    Meteor.publish('_widgets.single', function (_id) {
      _check( _id, String);
      const selector = {_id};
      const response = _clsWidgets.find(selector);
      // console.log('publish _widgets.single _id', _id);
      // console.log('publish _widgets.single response.title', response.title);
      return response;
    });
  };
}

const Publications = {
  new: init,
};

export default Publications;
