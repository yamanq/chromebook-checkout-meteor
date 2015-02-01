Momentum.registerPlugin('slide-fade', function(options) {
  options = _.extend({
    duration: 200,
    easing: 'ease-in-out'
  }, options);

  return {
    insertElement: function(node, next, done) {
      var $node = $(node);

      $node
        .hide()
        .insertBefore(next)
        .velocity('fadeIn')
        .velocity('slideDown', {
          easing: options.easing,
          duration: options.duration,
          queue: false,
          complete: function() {
            $node.css('height', ''); // remove explicit height
            done();
          }
        });
    },
    removeElement: function(node, done) {
      var $node = $(node);

      $node.velocity('slideUp', {
        easing: options.easing,
        duration: options.duration,
        complete: function() {
          $node.remove();
          done();
        }
      });
    }
  }
});