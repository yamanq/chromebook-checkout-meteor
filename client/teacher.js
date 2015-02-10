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
	},
  chromebooks: function() {
    return Chromebooks.find({}, {sort: {number: 1}});
  },
  carts: function() {
    return carts.find();
  }
});
