Main = React.createClass({
  render() {
    return (
      <div className="container">
          <header className="navbar navbar-default" role="navigation"> 
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Microscope</a>
            </div>
          </header>
            {this.props.content}
      </div>
    )
  }
});