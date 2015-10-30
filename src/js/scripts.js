(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    /**
     * Variables
     */

    // Global variables
    var contactArray     = [];
    var baseAnimDuration = 300;

    // Global selectors
    var $sidebar         = $('.sidebar');
    var $contact         = $('.contact');
    var $inputs          = $('.input');



    /**
     * Functions
     */

    // Toggle contact form
    var toggleSidebar = function (el, position) {
      $(el).on('click', function (event){
        event.preventDefault();

        $sidebar.toggleClass('sidebar--open');
        $contact.toggleClass('contact--open');

        $sidebar.animate({
          top: position
        }, {
          duration: baseAnimDuration * 5,
          easing: 'easeOutBounce'
        });

        preventTabbing();
      });
    };

    // Prevent tabbing to off canvas elements
    var preventTabbing = function () {
      var $links = $('.js--tabbable');

      for( var i = 0, j =  $links.length; i < j; i++ ) {
        if ($sidebar.hasClass('sidebar--open')) {
          $links[i].setAttribute('tabindex', '');
        } else {
          $links[i].setAttribute('tabindex', '-1');
        }
      }
    };



    /**
     * Call functions
     */

    // Toggle contact form
    toggleSidebar('.js--contact-form-open', 0);
    toggleSidebar('.js--contact-form-close', '100%');



    /**
     * Window load calls
     */

    $(window).load(function () {
      // Remove loading overlay
      $('.loading').fadeOut();
    });

  });

})(jQuery, window, document);
