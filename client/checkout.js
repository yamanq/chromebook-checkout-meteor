Template.checkout.helpers({
  chromebooks: function() {
    return Chromebooks.find({}, {sort: {number: 1}});
  }
});

