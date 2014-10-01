Meteor.startup(function () {
  Meteor.publish('attenders', function() {
    return Meteor.users.find({
      goingDate: getMidnightDate(new Date())
    }, {
      //TODO filter fields to publish
    });
  });

  Meteor.methods({
    'going': function(date) {
      console.log('going date: ', date);
      date = date || new Date();
      return Meteor.users.update(this.userId, {
        $set: {
          goingDate: getMidnightDate(date)
        },
        $addToSet: {
          goingDates: getMidnightDate(date)
        }
      });
    },
    'notGoing': function() {
      return Meteor.users.update(this.userId, {
        $unset: {
          goingDate: ""
        }
      });
    },
    'getDate': function() {
      return new Date();
    }
  });
});
