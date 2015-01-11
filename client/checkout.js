Template.checkout.helpers({
  chromebooks: function() {
    return Chromebooks.find();
  }
});


Template.checkout.events({
  'click .cross' : function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      if (this.status === 0) {
        Chromebooks.update(this._id, {$set: {status: 2}});
        Chromebooks.update(this._id, {$set: {user: null}});
      }
      else if (this.status ===1) {
        Chromebooks.update(this._id, {$set: {status: 2}});
      }
      else {
        Chromebooks.update(this._id, {$set: {status: 0}});
        Chromebooks.update(this._id, {$set: {last_checkout: null}});
        Chromebooks.update(this._id, {$set: {userid: null}});
      }
    }
    else {
      alert("Access Denied");
    }
  },
  'click .edit': function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Router.go('/admin');
    }
    else {
      alert("Access Denied");
    }
  }
});