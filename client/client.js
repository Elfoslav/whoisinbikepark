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
    console.log('fb login');
    Meteor.loginWithFacebook({
      requestPermissions: [],
      loginStyle: 'redirect' //needed redirect for mobile app
    }, function(err) {
      console.log('login error: ', err);
    });
  },
  'click .logout-btn': function() {
    Meteor.logout();
  },
  'click .going': function() {
    Meteor.call('going');
  },
  'click .not-going': function() {
    Meteor.call('notGoing');
  }
});
