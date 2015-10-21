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
    var $select          = $('.select');



    /**
     * Functions
     */

    // Toggle contact form
    var toggleSidebar = function (el, position) {
      $(el).on('click', function(e){
        e.preventDefault();
        $contact.toggleClass('contact--open');
        $sidebar.animate({
          top: position
        }, {
          duration: baseAnimDuration * 5,
          easing: 'easeOutBounce'
        });
      });
    };

    var toggleContactDetails = function () {
      if ($select.val() === 'call') {
        $('.input--contact-details').attr('data-placeholder', '+44 (0)20 1234 5678');
      } else {
        $('.input--contact-details').attr('data-placeholder', 'tony@tonyphipps.co.uk');
      }
    };

    // Add form content to array
    $('.btn--primary').on('click', function (e) {
      e.preventDefault();
      $inputs.each(function() {
        contactArray.push($(this).text());
      });
      console.log(contactArray);
      contactArray = [];
    });



    /**
     * Call functions
     */

    // Toggle contact form
    toggleSidebar('.js--contact-form-open', 0);
    toggleSidebar('.js--contact-form-close', '100%');

    // Toggle contact details
    $select.on('change', function(){
      toggleContactDetails();
    });


    /**
     * Window load calls
     */

    $(window).load(function() {
      // Remove loading overlay
      $('.loading').fadeOut();

      // Stretchy Select
      Stretchy.selectors.filter = '.select';
    });

  });

})(jQuery, window, document);
