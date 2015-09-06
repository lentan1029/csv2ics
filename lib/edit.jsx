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
    return {
      post: Posts.findOne()
    }
  },

  render() {
    if (this.data.post){ //possible race condition. 
      return (
        <Post post={this.data.post} />
      )
    }
    else {
      return <div></div> //loading template
    }
  }
});