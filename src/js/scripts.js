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
      $(el).on('click', function (e){
        e.preventDefault();

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

    // Toggle contact details placeholder
    var toggleContactDetails = function () {
      if ($select.val() === 'Phone') {
        $('.js--contact-details-label').html('phone number');
        $('.js--contact-details-input').attr('placeholder', '+44 (0)20 1234 5678');
      } else {
        $('.js--contact-details-label').html('email address');
        $('.js--contact-details-input').attr('placeholder', 'will@hunting.co.uk');
      }
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


    // Add form content to array
    $('.btn--primary').on('click', function (e) {
      e.preventDefault();
      $inputs.each(function () {
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
    $select.on('change', function (){
      toggleContactDetails();
    });


    /**
     * Window load calls
     */

    $(window).load(function () {
      // Remove loading overlay
      $('.loading').fadeOut();
    });

  });

})(jQuery, window, document);
