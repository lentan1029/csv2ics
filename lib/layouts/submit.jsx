Submit = React.createClass({
  render() {
    return (
      <form className="main form">
        <div className="form-group">
          <label className="control-label" htmlFor="url">URL</label>
          <div className="controls">
              <input name="url" id="url" type="text" value="" placeholder="Your URL" className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="title">Title</label>
          <div className="controls">
              <input name="title" id="title" type="text" value="" placeholder="Name your post" className="form-control"/>
          </div>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary"/>
      </form>
    )
  }
});