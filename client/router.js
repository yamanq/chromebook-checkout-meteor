Router.route('/', function() {
  this.render("initial");
})

Router.route('/checkout', function() {
  if (Meteor.user()) {
    this.render("checkout");
  } else {
    this.redirect('/login');
  }
});

Router.route('/login', function() {
  if (Meteor.user()) {
    this.redirect('/checkout');
  } else {
    this.render("login");
  }
});

Router.route('/admin', function() {
  if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
    this.render("admin");
  } else {
    this.redirect('/checkout');
  }
});

Router.route('/teacher', function() {
  if (Roles.userIsInRole(Meteor.userId(), ['admin', 'teacher'])) {
    this.render("teacher");
  } else {
    this.redirect('/checkout');
  }
});