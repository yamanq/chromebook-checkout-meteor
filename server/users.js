Meteor.publish('chromebook', function() {
  return Chromebooks.find();
});

/*Meteor.publish('user', function() {
  return Meteor.users.find({_id: this.userId},
      {fields: {'_id': 1, 'profile.name': 1}});
});
*/

var adminusers = [
  "ybq987@gmail.com",
  // "mminer@bloomfield.org",
  "qalieh.yaman90@bloomfield.org"
];
for (var i = 0; i < adminusers.length; i++) {
  var adminuser = adminusers[i];
  var userID = Meteor.users.findOne({"services.google.email": adminuser})._id;
  Meteor.users.update(userID, {$set: {roles: ['admin']}});
};

Accounts.validateNewUser(function (user) {
  var loggedInUser = Meteor.user();

  if (Roles.userIsInRole(loggedInUser, ['admin'])) {
    return true;
  }

  throw new Meteor.Error(403, "Not authorized to create new users");
});

Meteor.methods({
  deleteUser: function (targetUserId, group) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser, 
                            ['admin'], group)) {
      throw new Meteor.Error(403, "Access denied")
    }

    // remove permissions for target group
    Roles.setUserRoles(targetUserId, [], group)

    // do other actions required when a user is removed...
  }
})

Meteor.methods({
  updateRoles: function (targetUserId, roles, group) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser, 
                            ['admin'], group)) {
      throw new Meteor.Error(403, "Access denied")
    }

    Roles.setUserRoles(targetUserId, roles, group)
  }
})