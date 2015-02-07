var statusmap = {
  0: "available",
  1: "checkedout",
  2: "unavailable"
}

Meteor.subscribe('carts');

Template.cart.helpers({
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
  url: function() {
    return Router.current().originalUrl.replace("http://cbook.meteor.com/", "");
  }
});

Template.cart.events({
  'click .available': function() {
    Meteor.call('availablecart', this);
  },
  'click .checkedout': function() {
    Meteor.call('checkedoutcart', this);
  }
});