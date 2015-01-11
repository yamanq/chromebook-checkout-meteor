Meteor.publish('chromebook', function() {

  if (Roles.userIsInRole(this.userId, ['admin'])) {

    return Chromebooks.find();

  } 
  else {
    return Chromebooks.find({}, {fields: {number: 1, status: 1, userid: 1, last_checkout: 1, user: 1}});

  }
});

var adminusers = [
  "ybq987@gmail.com",
  "mminer@bloomfield.org",
  "qalieh.yaman90@bloomfield.org",
  "ksjdragon@gmail.com",
  "chthomas@bloomfield.org"
];
for (var i = 0; i < adminusers.length; i++) {
  var adminuser = adminusers[i];
  if (Meteor.users.findOne({"services.google.email": adminuser}) != undefined) {
    var userID = Meteor.users.findOne({"services.google.email": adminuser})._id;
    Roles.addUsersToRoles(userID, ['admin']);    
  }
};

var teachers = [
  // Add all Teachers here
  "mminer@bloomfield.org",
  "qalieh.yaman90@bloomfield.org",
  "ruhelski@bloomfield.org",
  "ksjdragon@gmail.com"
];
for (var i = 0; i < teachers.length; i++) {
  var teacher = teachers[i];
  if (Meteor.users.findOne({"services.google.email": teacher}) != undefined) {
    var userID = Meteor.users.findOne({"services.google.email": teacher})._id;
    Roles.addUsersToRoles(userID, ['teacher']);
  }
};

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