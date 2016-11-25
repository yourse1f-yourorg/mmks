import _lgr from '/lib/logging/client/clientLogger';
const Lgr = new _lgr(__filename, 'warn', true);

export default {

  // create
  add({Meteor, LocalState, FlowRouter}, data) {
    Lgr.a = 'add';
    const _id = Meteor.uuid();
    Meteor.call('_widgets.add', data, _id, (err) => {
      if (err) {
        Lgr.error(err.message);
        LocalState.set('_widgets.ADD_ERROR', err.message);
        return;
      }
      FlowRouter.go('/widgets/' + _id);
    });
  },

  // update
  update({Meteor, LocalState, FlowRouter}, data, _id) {
    Lgr.a = 'add';
    Meteor.call('_widgets.update', data, _id, (err) => {
      if (err) {
        Lgr.error(err.message);
        LocalState.set('_widgets.UPDATE_ERROR', err.message);
        return;
      }
      FlowRouter.go('/widgets/' + _id);
    });
  },

  hide({Meteor, LocalState, FlowRouter}, _id) {

    Meteor.call('_widgets.hide', _id, (err) => {
      if (err) {
        return LocalState.set('_widgets.HIDE_ERROR', err.message);
      }
      FlowRouter.go('/widgets/');

    });
  },

  // clearError
  clearErrors({LocalState}) {
    Lgr.a = 'clearErrors';
    Lgr.debug('clearing now');
    LocalState.set('_widgets.DELETE_ERROR', null);
    LocalState.set('_widgets.HIDE_ERROR', null);
    LocalState.set('_widgets.ADD_ERROR', null);
    LocalState.set('_widgets.UPDATE_ERROR', null);
    return;
  }

};
