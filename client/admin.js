Template.admin.helpers({
  chromebooks: function() {
    return Chromebooks.find({}, {sort: {number: 1}});
  },
  carts: function() {
    return carts.find();
  },
  tabs: function () {
    // Every tab object MUST have a name and a slug!
    return [
      { name: 'Single', slug: 'single' },
      { name: 'Carts', slug: 'carts' }
       ];
  }
});

ReactiveTabs.createInterface({
  template: 'teacherTabs',
  onChange: function (slug, template) {
  }
});

Template.admin.events({
  "submit .add, click .add": function (event) {
    event.preventDefault();

    var chromebook_number = $("input[name='anumber']")[0].value;
    var chromebook_serial = $("input[name='aserial']")[0].value;

    if (!((chromebook_number === "") || (chromebook_serial === "")))

    Chromebooks.insert({
      "status": 0,
      "userid": null,
      "last_checkout": null,
      "serial": chromebook_serial,
      "number": chromebook_number
    });
    
    // Clear form
    $("input[name='anumber']")[0].value = "";
    $("input[name='aserial']")[0].value = "";

    // Prevent default form
    return false;
  },
  "submit .addc, click .addc": function (event) {
    event.preventDefault();

    var cart_number = $("input[name='acnumber']")[0].value;

    if (!((cart_number === "")))

    carts.insert({
      "status": 0,
      "userid": null,
      "last_checkout": null,
      "number": cart_number
    });

    // Clear form
    $("input[name='acnumber']")[0].value = "";

    // Prevent default form
    return false;
  },
  'click .cross' : function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Chromebooks.remove(this._id);
    }
  },
  'click .crossc' : function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      carts.remove(this._id);
    }
  },
  'click .yieldc' : function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      if (this.status === 0) {
        carts.update(this._id, {$set: {status: 2}});
      }
      else if (this.status === 1) {
        carts.update(this._id, {$set: {status: 2}});
      }
      else {
        carts.update(this._id, {$set: {status: 0}});
        carts.update(this._id, {$set: {last_checkout: null}});
        carts.update(this._id, {$set: {userid: null}});
        carts.update(this._id, {$set: {user: null}});
      }
    }
    else {
      alert("Access Denied");
    }
  },
  'click .yield' : function() {
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
  }
});

Template.admin.rendered = function() {

    $(".border.tabs-content").mCustomScrollbar({
        theme: 'dark',
        scrollInertia: 0,
        mouseWheelPixels: 30
    });
}