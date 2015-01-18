ReactiveTabs.createInterface({
  template: 'teacherTabs',
  onChange: function (slug, template) {
  }
});

Template.teacher.helpers({
  tabs: function () {
    // Every tab object MUST have a name and a slug!
    return [
      { name: 'Single', slug: 'single' },
      { name: 'Carts', slug: 'carts' }
   		 ];
	}
});

Template.teacher.helpers({
  chromebooks: function() {
    return Chromebooks.find();
  },
  carts: function() {
    return carts.find();
  }
});
Template.teacher.rendered = function() {

    $(".tchChromebooks").mCustomScrollbar({
        theme: 'dark'
    });
}
