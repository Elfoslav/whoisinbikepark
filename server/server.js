Meteor.startup(function () {
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });
  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: '700491546665906',
    secret: '1c05ddefa5fd9499dd73be0d680eec2b'
  });
});