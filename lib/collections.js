//wip: prompts user to download a test text file


/*Posts = new Mongo.Collection("posts");/*

Meteor.methods({
  postInsert: function(postAttributes){
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});*/

/*var fs  = Npm.require('fs');
var rootdir = __meteor_bootstrap__.serverDir + '/assets/app/';
var fileName = new Date().getTime() + '.ics';
var filepath = rootdir + fileName;
console.log(filepath);
var content = "testtestsetseteststsetsesttest";

fs.writeFile(filepath, content, function(err){
  if(err){
    console.log(err);
  } else {
    downloadFile();
  }
});

function downloadFile(){

  console.log("file is to be downloaded")
}*/

Schedules = new FS.Collection("schedules", {
  stores: [new FS.Store.GridFS("schedules")]
});

Schedules.allow({
    download: function(userId, fileObj) {
        return true
    }
})

if(Meteor.isServer){
  var request = Meteor.npmRequire('request');

  request.get({url: 'localhost:3000/csv2ics/', encoding: null}, Meteor.bindEnvironment(function(e, r, buffer){
    
    var newFile = new FS.File();
    var buffer = new Buffer("asdfasdfasdfasdffffff", 'utf-8');
    
    newFile.attachData(buffer, {type: 'text/plain'}, function(error){
      if(error) throw error;
      newFile.name('asdf.ics');

      Schedules.insert(newFile);
    });
  })).auth(null, null, true, accessToken);


//var content = "asdfasdfasdfsadfadasdfad";
/*var request = Meteor.npmRequire('request');
*/

Meteor.methods({
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



Meteor.publish("schedule", function(){
  return Schedules.findOne();
})

}
