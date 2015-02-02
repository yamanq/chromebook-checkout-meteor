carts = new Mongo.Collection("carts");
carts.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(Meteor.user()._id, ['admin']);
  },
  remove: function (userId, doc) {
    return Roles.userIsInRole(Meteor.user()._id, ['admin']);
  }
});