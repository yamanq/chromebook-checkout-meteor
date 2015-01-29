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
    return Chromebooks.find({}, {sort: {number: 1}});
  },
  carts: function() {
    return carts.find();
  }
});
Template.teacher.rendered = function() {

    $(".tchChromebooks").mCustomScrollbar({
        theme: 'dark',
        scrollInertia: 0,
        mouseWheelPixels: 30
    });
}
