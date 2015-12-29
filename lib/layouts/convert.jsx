Convert = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },

  csvToIcs(csv){
    var arr = parseCsv(csv);
    var res = [];
    for(var i = 0; i < arr.length; i++){
      res = res.concat(eventGenerator(arr[i][8],arr[i][9],arr[i][10],arr[i][11],arr[i][12],arr[i][4]+" ("+arr[i][3]+")",arr[i][13],arr[i][14],arr[i][5],arr[i][7]=="EXAM", arr[i][6]));
    }

    return arrToIcs(res);
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
              <textarea name="csv" ref="csvValues" value={null} className="form-control" rows="15" placeholder="Copy the text from the webpage or file into this box." required></textarea>
          </div>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary"/>
      </form>
      </div>
    )

  }
});

function formatDT(datetime){
  var y = datetime.getYear() + 1900;
  y = y.toString();
  var m = (Number(datetime.getMonth())+1).toString();
  m = ("0" + m).slice(-2);
  var d = datetime.getDate();
  d = ("0" + d).slice(-2);
  var h = datetime.getHours();
  h = ("0" + h).slice(-2);
  var min = datetime.getMinutes();
  min = ("0" + min).slice(-2);
  var s = "00";

  return y+m+d+"T"+h+min+s
}

function arrToIcs(eventArray){
  var ics = "\
BEGIN:VCALENDAR\n\
VERSION:2.0\n\
PRODID:-//SMU Calendar//Lentan v0.1//EN\n\
X-WR-CALNAME:SMU Timetable\n\
X-APPLE-CALENDAR-COLOR:#1BADF8\n\
X-WR-TIMEZONE:Asia/Singapore\n\
\n"



for(var i = 0; i < eventArray.length; i++){

if(typeof(eventArray[i])!="undefined"){

  ics = ics.concat(
"BEGIN:VEVENT\n" + 
"UID:" + 
formatDT(new Date) + i.toString() +
"\n\
DTSTAMP:" +
formatDT(new Date) + 
"\n\
DTSTART:" + 
formatDT(eventArray[i][0]) + 
"\n\
DTEND:" + 
formatDT(eventArray[i][1]) + 
"\n\
SUMMARY:" + 
"Course Title: "+eventArray[i][2]+
" Location: "+eventArray[i][3]+
" Section: "+eventArray[i][5]+
" Taught by: "+eventArray[i][4]+
"\n\
END:VEVENT\n\
\n");

}

}

  ics = ics.concat("\nEND:VCALENDAR");
  return ics

}

function parseCsv(data){
  var arr = data.split('\n');
  arr = arr.map(function(elem){
    return elem.replace(/\"/g, "").split(',');
  });

  return arr;
}

function eventGenerator(startDate, endDate, day, startTime, endTime, courseTitle, location, professor, section, isExam, enrolled){
  if(enrolled!="Enrolled") return;

  var res = [];

  //console.log(startDate);
  var dayNum = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  }
  startDate = dateParser(startDate);
  endDate = dateParser(endDate);
  for(; startDate <= endDate; startDate.setDate(startDate.getDate()+1)){
    if(startDate.getDay() == dayNum[day]){
      var tmpStart = new Date(startDate);
      tmpStart.setHours(startTime.slice(0,2));
      tmpStart.setMinutes(startTime.slice(3,5));
      var tmpEnd = new Date(startDate);
      tmpEnd.setHours(endTime.slice(0,2));
      tmpEnd.setMinutes(endTime.slice(3,5));

      res.push([tmpStart,tmpEnd, courseTitle, location, professor, section, isExam]);
    }
  }

  //console.log(res);
  return res;

}

function dateParser(dateString){
  //console.log(dateString)
  var d = dateString.slice(0,2);
  var m = dateString.slice(3,6);
  var y = dateString.slice(7,11);
  //console.log(m + " " + d + " " + y)
  return new Date(m + " " + d + " " + y);
}
