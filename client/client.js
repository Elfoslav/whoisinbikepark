Meteor.subscribe('attenders');

Template.home.helpers({
  going: function() {
    return Meteor.user().goingDate >= getMidnightDate(new Date());
  },
  attenders: function () {
    return Meteor.users.find({
      goingDate: getMidnightDate(new Date())
    });
  }
});

Template.home.events({
  'click .fb-login-btn': function (e) {
    e.preventDefault();

    $(e.currentTarget).text('Prihlasujem...');

    Meteor.loginWithFacebook({
      requestPermissions: [],
      loginStyle: 'redirect' //needed redirect for mobile app
    }, function(err) {
      if (err) {
        console.log('login error: ', err);
      }
    });
  },
  'click .logout-btn': function(e) {
    e.preventDefault();
    $('.logout-text').text('Odhlasujem...');
    Meteor.logout();
  },
  'click .going': function(e) {
    e.preventDefault();
    Meteor.call('going', new Date(), function(err, rowsUpdated) {
      console.log('going rows updated: ', rowsUpdated);
    });
  },
  'click .not-going': function(e) {
    e.preventDefault();
    Meteor.call('notGoing', function(err, rowsUpdated) {
      console.log('notGoing rows updated: ', rowsUpdated);
    });
  }
});
