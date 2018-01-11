'use strict';

/*
***********************************************************************************
***********************************************************************************
***
***                              Настройки Google Map API
***
***********************************************************************************
***********************************************************************************
*/

(function () {

  window.initMap = function() {
    var mstore = {lat: 21.0325397, lng: 105.8133641};

    var map = new google.maps.Map(document.querySelector('.page-footer__map-container'), {
      zoom: 15,
      center: mstore,
      disableDefaultUI: true
    });

    var marker = new google.maps.Marker({
      position: mstore,
      map: map
    });
  };

})();
