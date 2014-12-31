Meteor.publish('chromebook', function() {
  // return Chromebooks.find({}, {fields: {number: 1, status: 1, userid: 1, last_checkout: 1}});

  // var user = Meteor.user();
  // console.log("user:", user);
  // var field;

  // if (user && user.roles[0] == 'admin') {
  //   field = {number: 1, status: 1, userid: 1, last_checkout: 1, serial: 1};
  // }
  // else {
  //   field = {number: 1, status: 1, userid: 1, last_checkout: 1};
  // }
  // console.log("field:", field);
  // return Chromebooks.find({}, {fields: field});

  if (Roles.userIsInRole(this.userId, ['admin'])) {

    return Chromebooks.find();

  } else {

    // user not authorized. do not publish secrets
    this.stop();
    return;

  }
});

Meteor.publish('user', function() {
  //return Meteor.users.find({}, {fields: {profile: 1}});
  return Meteor.users.find();
});


var adminusers = [
  "ybq987@gmail.com",
  "mminer@bloomfield.org",
  "qalieh.yaman90@bloomfield.org"
];
for (var i = 0; i < adminusers.length; i++) {
  var adminuser = adminusers[i];
  if (Meteor.users.findOne({"services.google.email": adminuser}) != undefined) {
    var userID = Meteor.users.findOne({"services.google.email": adminuser})._id;
    Meteor.users.update(userID, {$set: {roles: ['admin']}});
  }
};

// Accounts.validateNewUser(function (user) {
//   var loggedInUser = Meteor.user();

//   if (Roles.userIsInRole(loggedInUser, ['admin'])) {
//     return true;
//   }

//   throw new Meteor.Error(403, "Not authorized to create new users");
// });

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