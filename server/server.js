Meteor.startup(function () {
  Meteor.users._ensureIndex({ goingDate: 1 });

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
    'going': function(date) {
      console.log('going date: ', date);
      console.log('getMidnightDate(date)', getMidnightDate(date));
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
