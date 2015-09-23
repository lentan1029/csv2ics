SubmitLink = React.createClass({
  mixins: [ReactMeteorData],
  
  getMeteorData() {
    return {
    currentUser: Meteor.user()
    };
  },

  render() {
    if(this.data.currentUser){
      return <a href={FlowRouter.path('postSubmit')}>Submit Post</a>
    }
    else {
      return <div></div> 
    }
  }
});