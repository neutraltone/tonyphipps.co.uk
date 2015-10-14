(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    $('.js--contact-form-trigger').on('click', function(e){
      e.preventDefault();

      var $main          = $('.main');
      var $sidebar       = $('.sidebar');
      var $sidebarHeight = $sidebar.outerHeight();

      console.log($sidebarHeight);

      $main.animate({
        top: '-' + $sidebarHeight,
      }, 300 );
    });

    /**
     * Window Load Calls
     */
    $(window).load(function() {

      // Remove Loading Overlay
      $('.loading').fadeOut();

    });
  });

})(jQuery, window, document);
