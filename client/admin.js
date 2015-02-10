Template.admin.helpers({
  chromebooks: function() {
    return Chromebooks.find({}, {sort: {number: 1}});
  },
  carts: function() {
    return carts.find();
  },
  tabs: function () {
    // Every tab object MUST have a name and a slug!
    return [
      { name: 'Single', slug: 'single' },
      { name: 'Carts', slug: 'carts' }
       ];
  }
});

ReactiveTabs.createInterface({
  template: 'teacherTabs',
  onChange: function (slug, template) {
  }
});

Template.admin.events({
  "submit .add, click .add": function () {
    Meteor.call('addchromebook', $("input[name='anumber']")[0].value, $("input[name='aserial']")[0].value);
    $("input[name='anumber']")[0].value = "";
    $("input[name='aserial']")[0].value = "";
    $("input[name='anumber']")[0].focus();
    return false;
  },

  "submit .addc, click .addc": function (event) {
    Meteor.call('addcart', $("input[name='acnumber']")[0].value);
    $("input[name='acnumber']")[0].value = "";
    return false;
  },

  'click .cross' : function() {
    Meteor.call('removechromebook', this);
  },

  'click .crossc' : function() {
    Meteor.call('removecart', this);
  },

  'click .yieldc' : function() {
    Meteor.call('yieldcart', this);
  },
  
  'click .yield' : function() {
    Meteor.call('yieldchromebook', this);
  }
});

