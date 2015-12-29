var fs = require('fs');

fs.readFile('csv.txt', 'utf-8', function(err, data){
  if(err) throw err;
  var arr = parseCsv(data);
  var res = [];
  for(var i = 0; i < arr.length; i++){
    res = res.concat(eventGenerator(arr[i][8],arr[i][9],arr[i][10],arr[i][11],arr[i][12],arr[i][4]+" ("+arr[i][3]+")",arr[i][13],arr[i][14],arr[i][5],arr[i][7]=="EXAM"));
  }

  console.log(arrToIcs(res));
  
});

function formatDT(datetime){
  var y = datetime.getYear();
  var m = datetime.getMonth();
  ("0" + m).slice(-2);
  var d = datetime.getDate();
  ("0" + d).slice(-2);
  var h = datetime.getHours();
  ("0" + h).slice(-2);
  var m = datetime.getMinutes();
  ("0" + m).slice(-2);
  var s = datetime.getSeconds();
  ("0" + s).slice(-2);

  return y+m+d+"T"+h+m+s
}

function arrToIcs(eventArray){
  var ics = "\
BEGIN:VCALENDAR\n\
VERSION:2.0\n\
PRODID:-//SMU Calendar//Lentan v0.1//EN\n\
\n"



for(var i = 0; i < eventArray.length; i++){
  ics = ics.concat(
"BEGIN:VEVENT\n\
DTSTART:" + 
formatDT(eventArray[i][0]) + 
"\n\
DTEND:" + 
formatDT(eventArray[i][1]) + 
"\n\
SUMMARY:" + 
eventArray[i][2]+eventArray[i][3]+eventArray[i][4]+eventArray[i][5]+eventArray[i][6]+
"\n\
END:VEVENT\n\
\n");
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

function eventGenerator(startDate, endDate, day, startTime, endTime, courseTitle, location, professor, section, isExam){
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
