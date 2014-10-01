Meteor.startup(function () {
  Meteor.publish('attenders', function() {
    return Meteor.users.find({
      goingDate: getMidnightDate(new Date())
    }, {
      //TODO filter fields to publish
    });
  });

  Meteor.methods({
    'going': function() {
      Meteor.users.update(this.userId, {
        $set: {
          goingDate: getMidnightDate(new Date())
        },
        $addToSet: {
          goingDates: getMidnightDate(new Date())
        }
      });
    },
    'notGoing': function() {
      Meteor.users.update(this.userId, {
        $unset: {
          goingDate: ""
        }
      });
    }
  });
});
