FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
    ReactLayout.render(Main, {content: <Login />});
  }
});

FlowRouter.route('/csv2ics', {
  name: 'convert',
  triggersEnter: [checkLoggedIn],
  action: function(params) {
    ReactLayout.render(Main, {content: <Convert />});
  }
});


//blazerender: test 
FlowRouter.route('/blazerender', {
  name: 'blazerender',
  triggersEnter: [checkLoggedIn],
  action: function(params) {
    ReactLayout.render(IncludeTemplate, {template: Template.fileList});
  }
});

function checkLoggedIn(context, redirect) {
  if (!Meteor.user()){
    redirect('/');
  }
}

/*FlowRouter.notFound = {
  action: function(){
    FlowRouter.go("home");
  }
}*/