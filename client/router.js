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
  if (Meteor.user().roles[0]==='admin') {
    this.render("admin");
  } else {
    this.redirect('/checkout');
  }
});