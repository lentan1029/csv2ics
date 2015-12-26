Main = React.createClass({
  render() {
    return (
      <div className="container">
          <header className="navbar navbar-default" role="navigation"> 
            <a className="navbar-brand" href={FlowRouter.path('home')}>SMU Calendar CSV to ICS converter</a>
            <AccountsUIWrapper /> {/* <-- not ACTUALLY a navbar by twbs standards, so use pull-right instead of navbar-right*/}
            <div className="navbar-brand">
            </div>
          </header>
        <div className="container-fluid">
          {this.props.content}
        </div>
      </div>
    )
  }
});