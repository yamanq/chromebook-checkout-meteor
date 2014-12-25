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