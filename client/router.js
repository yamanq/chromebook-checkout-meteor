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
  if (Roles.userIsInRole(Meteor.userId(), ['teacher'])) {
    this.redirect('/teacher');
  } else if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
    this.redirect('/admin');
  } else {
        if (Meteor.loggingIn()) {
          Router.redirect('/login')
      }
      else {
        this.redirect('/checkout');
      };
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