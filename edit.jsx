Edit = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      post: Posts.findOne({_id: this.props.postId})
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