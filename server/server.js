Meteor.startup(function () {
  Meteor.users._ensureIndex({ goingDate: 1 });
  Logs = new Mongo.Collection("logs");

  Meteor.publish('attenders', function() {
    console.log('publish attenders date: ', new Date());
    console.log('publishing attenders with date: ', getMidnightDate(new Date()));
    return Meteor.users.find({
      goingDate: getMidnightDate(new Date())
    }, {
      fields: {
        goingDate: 1,
        profile: 1,
        'services.facebook.id': 1
      }
    });
  });

  Meteor.methods({
    log: function(errMessage) {
      Logs.insert({
        timestamp: new Date(),
        message: errMessage
      });
    }
  });
});
