Convert = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },

  csvToIcs(csv){
    var ics = "\
BEGIN:VCALENDAR\n\
VERSION:2.0\n\
PRODID:-//SMU Calendar//Lentan v0.1//EN\n\
\n\
BEGIN:VEVENT\n\
UID:uid1@example.com\n\
DTSTAMP:19970714T170000Z\n\
ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com\n\
DTSTART:19970714T170000Z\n\
DTEND:19970715T035959Z\n\
SUMMARY:Bastille Day Party\n\
END:VEVENT\n\
\n\
    ";


    ics.concat("\n END:VCALENDAR");
    return ics;
  },


  handleSubmit(event){
    event.preventDefault();
    var csv = ReactDOM.findDOMNode(this.refs.csvValues).value;
    var ics = this.csvToIcs(csv);
    Meteor.call("storeIcs", ics, Meteor.userId());
    ReactLayout.render(Main, {content: <IncludeTemplate template={Template.fileList}/>})
   },

  render() {
    return (
      <div>
      <div className="post"> Login to <a target="_blank" href="https://eservices.smu.edu.sg/BOSS/BOSSWeb/TTPlanner.aspx">BOSS</a>. Copy the text from <a target="_blank" href="https://eservices.smu.edu.sg/BOSS/BOSSWeb/DownloadTimetable.aspx">"Download class and exam timetable"</a> and paste it below. </div>
      <form className="main form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="control-label" htmlFor="url">CSV</label>
          <div className="controls"> 
              <textarea name="csv" ref="csvValues" value={null} className="form-control" rows="15" placeholder="CSV Values" required></textarea>
          </div>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary"/>
      </form>
      </div>
    )

  }
});


