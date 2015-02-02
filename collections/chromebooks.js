Chromebooks = new Mongo.Collection("chromebook");
Chromebooks.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  update: userId,
  remove: function (userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  fetch: userId
});