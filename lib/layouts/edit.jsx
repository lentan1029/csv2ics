/*Edit = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      post: Posts.find({title: "Introducing Telescope"}).fetch()
    }
  },

  render(){
      return <div>{this.renderPosts()}</div>
  },

  renderPosts() {

    return this.data.post.map((post) => {
      return <Post key={post._id} post={post} />
    });
  }

});*/

Edit = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {};
    var handle = Meteor.subscribe("posts");
    if (handle.ready()){
      data.post = Posts.findOne({_id: this.props.postId})
    }
    return data;
  },

  render() {
    if (this.data.post){ //possible race condition. 
      return (
        <Post postId={this.props.postId} post={this.data.post} />
      )
    }
    else {
      return <div>loading...</div> //loading template
    }
  }
});