Template.admin.helpers({
  chromebooks: function() {
    return Chromebooks.find();
  }
});

Template.admin.events({
  "submit .add, click .add": function (event) {
    event.preventDefault();

    var chromebook_number = $("input[name='anumber']")[0].value;
    var chromebook_serial = $("input[name='anumber']")[0].nextElementSibling.value;

    Chromebooks.insert({
      "status": 0,
      "userid": null,
      "last_checkout": null,
      "serial": chromebook_serial,
      "number": chromebook_number
    });

    // Clear form
    chromebook_number.value = "";
    chromebook_serial.value = "";

    // Prevent default form
    return false;
  }
});