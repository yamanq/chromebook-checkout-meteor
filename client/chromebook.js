var statusmap = {
  0: "available",
  1: "checkedout",
  2: "unavailable"
}

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
  'click .available': function() {
    Chromebooks.update(this._id, {$set: {status: 1}});
    Chromebooks.update(this._id, {$set: {last_checkout: new Date()}});
  },
  'click .checkedout': function() {
    Chromebooks.update(this._id, {$set: {status: 0}});
    Chromebooks.update(this._id, {$set: {last_checkout: null}});
  }
});