Meteor.methods({
  'going': function(date) {
    console.log('going date: ', date);
    console.log('getMidnightDate(date)', getMidnightDate(date));
    if (Meteor.isServer && /localhost/.test(Meteor.absoluteUrl())) {
      Meteor._sleepForMs(2000);
    }
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
    if (Meteor.isServer && /localhost/.test(Meteor.absoluteUrl())) {
      Meteor._sleepForMs(2000);
    }
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