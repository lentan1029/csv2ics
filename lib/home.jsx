if (Meteor.isClient) {
 
  Meteor.startup(function () {
    Meteor.subscribe("posts");
  });
}

Home = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    /*var data = {};
    var postId = this.props.postId;
    var handle = Meteor.subscribe('Posts');
    if (handle.ready()){
      if (this.props.postId) {
        data.post = Posts.findOne({_id: this.props.postId})
      }
    }
    else {
      data.post = Posts.find().fetch()
    }*/

    return {
      posts: Posts.find().fetch()
    }
  },

  renderPosts(){
    return this.data.posts.map((post) => {
      return <Post key={post._id} postId={post._id} post={post} />; //key not accessible from props anymore. check docs. using postId instead.
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
        <div>asdf</div>
      )
    }
  }

});