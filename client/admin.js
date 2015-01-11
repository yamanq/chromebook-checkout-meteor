Template.admin.helpers({
  chromebooks: function() {
    return Chromebooks.find();
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
  'click .cross' : function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Chromebooks.remove(this._id);
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