Template.checkout.helpers({
  chromebooks: function() {
    return Chromebooks.find();
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
        theme: 'dark'
    });
}