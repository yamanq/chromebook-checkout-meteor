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
  } else if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
    this.redirect('/admin');
  } else if (Roles.userIsInRole(Meteor.userId(), ['teacher'])) {
    this.redirect('/teacher');
  } else {
    this.render("login");
  }
});

Router.route('/admin', function() {
  if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
    this.render("admin");
  } else {
    this.redirect('/login');
  }
});

Router.route('/teacher', function() {
  if (Roles.userIsInRole(Meteor.userId(), ['admin', 'teacher'])) {
    this.render("teacher");
  } else {
       this.redirect('/login');
  }
});