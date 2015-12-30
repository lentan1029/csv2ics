Schedules = new FS.Collection("schedules", {
  stores: [new FS.Store.GridFS("schedules")]
});

Schedules.allow({
    download: function(userId, fileObj) {
        return true
    }
})

if(Meteor.isServer){

  Meteor.methods({

    storeIcs : function(content, userId) {
      var request = Meteor.npmRequire('request');

      request.get({url: 'localhost:3000/csv2ics/', encoding: null}, Meteor.bindEnvironment(function(e, r, buffer){
        
        var newFile = new FS.File();
        var buffer = new Buffer(content, 'utf-8');
        
        newFile.userId = userId;
        newFile.metaData = {timeStamp: new Date()};

        newFile.attachData(buffer, {type: 'text/calendar'}, function(error){
          if(error) throw error;
          newFile.name('Class and Exam Schedule.ics');
          Schedules.insert(newFile);
        });


      })).auth(null, null, true, accessToken);

    },

    getAccessToken : function() {
      try {
        return Meteor.user().services.facebook.accessToken;
      } catch(e) {
        return null;
      }
    }
  }); 

  var accessToken = Meteor.call("getAccessToken", function(error, accessToken){
     return accessToken;
  })



  Meteor.publish("schedules", function(){
    return Schedules.find();
  })

}
