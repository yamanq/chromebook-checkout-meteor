var statusmap = {
  0: "available",
  1: "checkedout",
  2: "unavailable"
}

Meteor.subscribe('carts');

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