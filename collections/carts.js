carts = new Mongo.Collection("carts");
carts.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  update: function (userId, doc) {
    return (userId != null);
  },
  remove: function (userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  fetch: []
});