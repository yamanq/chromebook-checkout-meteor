Chromebooks = new Mongo.Collection("chromebook");
Chromebooks.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  update: function (userId, doc) {
  	if ((Chromebooks.findOne({userid: Meteor.userId()}) === undefined) 
    || (Roles.userIsInRole(Meteor.userId(), ['admin', 'teacher']))) {
      Chromebooks.update(this._id, {$set: {status: 1}});
      Chromebooks.update(this._id, {$set: {last_checkout: new Date()}});
      Chromebooks.update(this._id, {$set: {userid: Meteor.userId()}});
      Chromebooks.update(this._id, {$set: {user: Meteor.user().profile.name}});
    }
  },
  remove: function (userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  fetch: []
});