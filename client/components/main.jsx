//if (Meteor.isClient) {
  // This code is executed on the client only
 
  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    //React.render(<App />, document.getElementById("render-target"));
    Meteor.subscribe("posts");
  });
//}

App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      posts: Posts.find().fetch()
    }
  },

  renderPosts(){
    //implement domain 
    return this.data.posts.map((post) => {
      return <Post key={post._id} post={post} />;
    });
  },

  render() {

    return (
      <div className="container">
        <header className="navbar navbar-default" role="navigation"> 
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Microscope</a>
          </div>
        </header>
        <div id="main">
          {this.renderPosts()}
        </div>
      </div>
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