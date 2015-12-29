if(Meteor.isClient){
  Meteor.subscribe("schedules");

  Template.fileList.helpers({
    schedule: function () {
      return Schedules.find();
    }
  });

}