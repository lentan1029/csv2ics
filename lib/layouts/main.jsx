Main = React.createClass({
  render() {
    return (
      <div className="container">
          <header className="navbar navbar-default" role="navigation"> 
            <a className="navbar-brand" href={FlowRouter.path('home')}>Template</a>
            <AccountsUIWrapper /> {/* <-- not ACTUALLY a navbar by twbs standards, so use pull-right instead of navbar-right*/}
            <div className="navbar-brand">
              <SubmitLink />
            </div>
          </header>
        <div className="container-fluid">
          {this.props.content}
        </div>
      </div>
    )
  }
});