Template.login.events({
  'click .chromeicon': function() {
    var randomint = Math.floor(Math.random() * (links.length - 1));
    window.open(links[randomint], "_blank");
  },
  'click .submit': function() {
    Router.go('/login');
  }
})