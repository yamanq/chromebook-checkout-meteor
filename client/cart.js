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
    if ((carts.findOne({userid: Meteor.userId()}) === undefined) 
    || (Roles.userIsInRole(Meteor.userId(), ['admin', 'teacher']))) {
      carts.update(this._id, {$set: {status: 1}});
      carts.update(this._id, {$set: {last_checkout: new Date()}});
      carts.update(this._id, {$set: {userid: Meteor.userId()}});
      carts.update(this._id, {$set: {user: Meteor.user().profile.name}});
    }
  },
  'click .checkedout': function() {
    if (Meteor.userId() === this.userid) {
      carts.update(this._id, {$set: {status: 0}});
      carts.update(this._id, {$set: {last_checkout: null}});
      carts.update(this._id, {$set: {userid: null}});
      carts.update(this._id, {$set: {user: null}});
    }
  }
});