carts = new Mongo.Collection("carts");
carts.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  update: userId,
  remove: function (userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  fetch: userId
});