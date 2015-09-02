Edit = React.createClass({

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

});