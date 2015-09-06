if (Meteor.isClient) {
 
  Meteor.startup(function () {
    Meteor.subscribe("posts");
  });
}

Home = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      posts: Posts.find().fetch()
    }
  },

  renderPosts(){
    return this.data.posts.map((post) => {
      return <Post key={post._id} post={post} />;
    });
  },

  render() {
    return (
      <div>{this.renderPosts()}</div>
    )
  }

});



Post = React.createClass({

  domain(url) {
    var a = document.createElement("a");
    a.href = url;
    return a.hostname;
  },

  render() {
    return (
      <div className="post">
        <div className="post-content">
          <h3><a href={this.props.post.url}>{this.props.post.title}</a><span>{this.domain(this.props.post.url)}</span></h3>
        </div>
      </div>
    )
  }

});