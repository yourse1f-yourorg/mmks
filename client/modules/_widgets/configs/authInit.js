export default ( context ) => {
//  console.log(' Configuring access-points for widgets ', context);
//  const { App, LocalState, ACL } = context;
  const { App, LocalState } = context;

  LocalState.set('module.widgets.subscription', 'waiting' );
  Meteor.subscribe('access-points', 'widgets', App.group, function () {
    LocalState.set('module.widgets.subscription', 'ready' );
//    console.log('\n\n Finding => all: ', ACL.AccessControl.find({ }).fetch());
  });

};
