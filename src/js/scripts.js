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
    var $contact         = $('.sidebar');
    var $inputs          = $('.input');



    /**
     * Functions
     */

    // Toggle contact form
    var toggleContact = function (el, position) {
      $(el).on('click', function(e){
        e.preventDefault();
        $contact.animate({
          top: position
        }, {
          duration: baseAnimDuration * 5,
          easing: 'easeOutBounce'
        });
      });
    };

    // Add form content to array
    $('.btn--primary').on('click', function (e) {
      e.preventDefault();
      $inputs.each(function() {
        contactArray.push($(this).text());
      });
      contactArray = [];
    });



    /**
     * Call functions
     */

    // Toggle contact form
    toggleContact('.js--contact-form-open', 0);
    toggleContact('.js--contact-form-close', '100%');



    /**
     * Window Load Calls
     */

    $(window).load(function() {
      // Remove loading overlay
      $('.loading').fadeOut();
    });

  });

})(jQuery, window, document);
