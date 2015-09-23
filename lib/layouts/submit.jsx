Submit = React.createClass({

  handleSubmit(event) {
    event.preventDefault();
    var postAttributes = {};
    postAttributes.url = React.findDOMNode(this.refs.postUrl).value.trim();
    postAttributes.title = React.findDOMNode(this.refs.postTitle).value.trim();

    Posts.insert(postAttributes);

    FlowRouter.go('/');
  },

  render() {
    return (
      <form className="main form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="control-label" htmlFor="url">URL</label>
          <div className="controls">
              <input name="url" ref="postUrl" type="text" value={null} placeholder="Your URL" className="form-control"></input>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="title">Title</label>
          <div className="controls">
              <input name="title" ref="postTitle" type="text" value={null} placeholder="Name your post" className="form-control"/>
          </div>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary"/>
      </form>
    )
  }
});