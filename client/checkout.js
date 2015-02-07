Template.checkout.helpers({
  chromebooks: function() {
    return Chromebooks.find({}, {sort: {number: 1}});
  }
});
Template.checkout.rendered = function() {

    $(".chckChromebooks").mCustomScrollbar({
        theme: 'dark',
        scrollInertia: 10,
        mouseWheel: { deltaFactor: 40 },
        alwaysShowScrollbar: 2
    });
}