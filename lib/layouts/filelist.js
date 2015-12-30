if(Meteor.isClient){
  Meteor.subscribe("schedules");

  Template.fileList.helpers({
    schedule: function () {
      if(Meteor.userId()){
        return Schedules.find({userId: Meteor.userId()});
      } else {
        return;
      }
    }
  });

}