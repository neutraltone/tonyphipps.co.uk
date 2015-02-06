(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    // FireShell
    $('.logo').on('click', function(e){
      e.preventDefault();
      $('.header').addClass('header--loaded');
    });
  });

})(jQuery, window, document);
