

Home = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {};
    var handle = Meteor.subscribe("posts");
    if (handle.ready()){
      data.posts = Posts.find().fetch();
    }
    return data;
  },

  renderPosts(){
    return this.data.posts.map((post) => {
      return <Post key={post._id} postId={post._id} post={post} />; //key not accessible from props anymore. check docs. using postId instead.
    });
  },

  render() {
    return (this.data.posts)? <div> {this.renderPosts()} </div> : <div>Loading...</div>;
  }

});



Post = React.createClass({

  domain(url) {
    var a = document.createElement("a");
    a.href = url;
    return a.hostname;
  },

  handleClick(postId) {
    FlowRouter.go('/post/' + postId);
  },

  render() {
    if (this.props){
      return (
        <div className="post" onClick={this.handleClick.bind(this, this.props.postId)}>
          <div className="post-content">
            <h3><a href={this.props.post.url}>{this.props.post.title}</a><span>{this.domain(this.props.post.url)}</span></h3>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>loading...</div>
      )
    }
  }

});