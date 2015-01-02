var statusmap = {
  0: "available",
  1: "checkedout",
  2: "unavailable"
}

Meteor.subscribe('chromebook');

//Meteor.subscribe('user');

Template.chromebook.helpers({
  status_class: function() {
    return statusmap[this.status];
  },
  time_ago: function() {
    if (this.last_checkout === null) {
      return "";
    } else {
      return moment(this.last_checkout).fromNow();      
    }
  }
});

Template.chromebook.events({
  'click .available, click .unavailable, click .checkedout': function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])
    && Router.current().route.path() === '/admin') {
      var chromebook_number = $("input[name='anumber']")[0].value;
      var chromebook_serial = $("input[name='anumber']")[0].nextElementSibling.value;
      chromebook_number = this.number;
      chromebook_serial = this.serial;
    }
  },
  'click .available': function() {
    if ((Chromebooks.findOne({userid: Meteor.userId()}) === undefined) 
    || (Roles.userIsInRole(Meteor.userId(), ['admin', 'teacher']))) {
      Chromebooks.update(this._id, {$set: {status: 1}});
      Chromebooks.update(this._id, {$set: {last_checkout: new Date()}});
      Chromebooks.update(this._id, {$set: {userid: Meteor.userId()}});
      Chromebooks.update(this._id, {$set: {user: Meteor.user().profile.name}});
    }
  },
  'click .checkedout': function() {
    if (Meteor.userId() === this.userid) {
      Chromebooks.update(this._id, {$set: {status: 0}});
      Chromebooks.update(this._id, {$set: {last_checkout: null}});
      Chromebooks.update(this._id, {$set: {userid: null}});
    }
  }
});