if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.home.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.home.events({
    'click .fb-login-btn': function (e) {
      e.preventDefault();
      console.log('fb login');
      Meteor.loginWithFacebook({
        requestPermissions: []
      }, function(err) {
        console.log('login error: ', err);
      });
    },
    'click .counter': function() {
      console.log('counter: ', Session.get('counter'));
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  function ContentController($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
  }

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
