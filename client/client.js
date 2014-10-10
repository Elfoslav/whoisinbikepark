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
  'mousedown .fb-login-btn, click .fb-login-btn': function (e) {
    e.preventDefault();

    $('.login-text').text('Prihlasujem...');

    //set timeout for Android, so login text is changed
    setTimeout(function() {
      Meteor.loginWithFacebook({
        requestPermissions: [],
        loginStyle: 'redirect' //needed redirect for mobile app
      }, function(err) {
        if (err) {
          alert('Chyba, skús znovu. ' + err.message);
          Meteor.call('log', err.message);
          console.log('login error: ', err);
        }
      });
    }, 10);
  },
  'mousedown .logout-btn, click .logout-btn': function(e) {
    e.preventDefault();
    $('.logout-text').text('Odhlasujem...');
    Meteor.logout();
  },
  'mousedown .going, click .going': function(e) {
    e.preventDefault();
    Meteor.call('going', new Date(), function(err, rowsUpdated) {
      console.log('going rows updated: ', rowsUpdated);
    });
  },
  'mousedown .not-going, click .not-going': function(e) {
    e.preventDefault();
    Meteor.call('notGoing', function(err, rowsUpdated) {
      console.log('notGoing rows updated: ', rowsUpdated);
    });
  }
});
