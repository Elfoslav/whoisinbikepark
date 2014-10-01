//uncomment this for FB login
//Meteor.startup(function () {
//  ServiceConfiguration.configurations.remove({
//    service: "facebook"
//  });
//
//  if (/localhost/.test(Meteor.absoluteUrl())) {
//    ServiceConfiguration.configurations.insert({
//      service: "facebook",
//      appId: 'your localhost app id',
//      secret: 'your localhost secret'
//    });
//  } else {
//    ServiceConfiguration.configurations.insert({
//      service: "facebook",
//      appId: 'your production app id',
//      secret: 'your production secret'
//    });
//  }
//});