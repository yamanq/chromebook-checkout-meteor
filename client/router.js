 Router.route('/', function() {
  this.render("initial");
})

Router.route('/checkout', function() {
  if (Meteor.user()._id != null) {
    this.render("checkout");
  } else {
    this.redirect('/login');
  }
});

Router.route('/login', function() {
  if (Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
    this.redirect('/admin');
  } else if (Roles.userIsInRole(Meteor.user()._id, ['teacher'])) {
    this.redirect('/teacher');
  } else if (Meteor.user()._id != null) {
    this.redirect('/checkout');
  }
  else {
    this.render('login')
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