Template.checkout.helpers({
  chromebooks: function() {
    return Chromebooks.find({}, {sort: {number: 1}});
  }
});

Template.checkout.events({
  'click .edit': function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Router.go('/admin');
    }
    else {
      alert("Access Denied");
    }
  },
  'click .teacher': function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin', 'teacher'])) {
      Router.go('/teacher');
    }
    else {
      alert("Access Denied");
    }
  }
});
Template.checkout.rendered = function() {

    $(".chckChromebooks").mCustomScrollbar({
        theme: 'dark',
        scrollInertia: 0,
        mouseWheel: { deltaFactor: 40 },
        alwaysShowScrollbar: 2
    });
}