(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    // Bounce out header div
    $('.logo').on('click', function(e){
      e.preventDefault();

      //$('.header').addClass('header--loaded');
      $('.header').slideUp(1750, 'easeOutBounce');
    });

  });

})(jQuery, window, document);
