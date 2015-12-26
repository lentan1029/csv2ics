Login = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {};
    if(!Meteor.user()){
      data.loggedIn = false;
    } else {
      data.loggedIn = true;
    }
    return data;
  },

  redirectToConvert(){
    console.log("here");
    FlowRouter.go("convert");
  },

  render() {
    if(this.data.loggedIn){
      return <div className="btn post" onClick={this.redirectToConvert}> Click to proceed. </div>
    } else {
      return <div> Please log in via Facebook. </div>
    }
  }

});