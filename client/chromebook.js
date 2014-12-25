var statusmap = {
  0: "available",
  1: "checkedout",
  2: "unavailable"
}

Meteor.subscribe('chromebook');

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
  },
  username: function() {
    return Meteor.users.findOne({_id: this.userid}).profile.name;
  }
});

Template.chromebook.events({
  'click .available': function() {
    Chromebooks.update(this._id, {$set: {status: 1}});
    Chromebooks.update(this._id, {$set: {last_checkout: new Date()}});
    Chromebooks.update(this._id, {$set: {userid: Meteor.userId()}});
  },
  'click .checkedout': function() {
    Chromebooks.update(this._id, {$set: {status: 0}});
    Chromebooks.update(this._id, {$set: {last_checkout: null}});
    Chromebooks.update(this._id, {$set: {userid: null}});
  }
});