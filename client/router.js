 Router.route('/', function() {
  this.render("initial");
})

Router.route('/checkout', function() {
  if (Meteor.user() != null) {
    this.render("checkout");
  } else {
    this.redirect('/login');
  }
});

Router.route('/login', function() {
  if (Meteor.user() == null) {
    this.render("login");
  } else if (Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
    this.redirect('/admin');
  } else if (Roles.userIsInRole(Meteor.user()._id, ['teacher'])) {
    this.redirect('/teacher');
  } else if (Meteor.user() != null) {
    this.redirect('/checkout');
  } else {
    this.redirect('')
  }
}); 

Router.route('/admin', function() {
  if (Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
    this.render("admin");
  } else {
    this.redirect('/login');
  }
});

Router.route('/teacher', function() {
  if (Roles.userIsInRole(Meteor.user()._id, ['admin', 'teacher'])) {
    this.render("teacher");
  } else {
    this.redirect('/login');
  }
});
Router.configure({
  notFoundTemplate: "initial"
});