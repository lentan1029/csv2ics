if(Meteor.isClient){

  Template.fileList.helpers({
    schedule: function () {
      return Schedules.find();
    }
  });

}