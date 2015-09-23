FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
    ReactLayout.render(Main, {content: <Home />});
  }
});

FlowRouter.route('/post/:_id', {
  name: 'postPage',
  action: function(params, queryparams) {
    ReactLayout.render(Main, {content: <Edit postId={params._id}/>});
  }
});

FlowRouter.route('/submit', {
  name: 'postSubmit',
  triggersEnter: [checkLoggedIn],
  action: function(params) {
    ReactLayout.render(Main, {content: <Submit />});
  }
});

function checkLoggedIn(context, redirect) {
  if (!Meteor.user()){
    redirect('/');
  }
}