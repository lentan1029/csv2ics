Main = React.createClass({
  render() {
    return (
      <div className="container">
          <header className="navbar navbar-default" role="navigation"> 
            <div className="navbar-header"> 
              <a className="navbar-brand" href="/">Microscope</a>
            </div>
            <AccountsUIWrapper /> {/* <-- not ACTUALLY a navbar by twbs standards, so use pull-right instead of navbar-right*/} 
          </header>
            {this.props.content}
      </div>
    )
  }
});