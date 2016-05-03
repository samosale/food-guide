  
  (function() {
	'use strict';

	angular
		.module('backoffice')
		.factory('serviceMap', serviceMap);
    
    
serviceMap.$inject = ['$q'];
  
 function serviceMap ($q) {
   
   

   var map;
   var marker;
   var infowindow;
   
  var initialize = function initialize() {

      var deferred = $q.defer();
      

      var pos = new google.maps.LatLng(44.7866,20.4489);
      var center = new google.maps.LatLng(44.7866,20.4489);

      map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: center,
        zoom: 12,
        streetViewControl: false,
        panControl: false,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      });
   
 
     var newPos = new google.maps.LatLng(47.61612, -122.2006);
      var request = {
        location: pos,
        radius: 8000,
        types: ['food']
      };
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      
      service.nearbySearch(request, callback);
      
console.log(service)



function callback(results, status) {
   
       
       
     
      if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results)
      
      deferred.resolve(results);

      return results;
    
      }
  
    }
    
    
    return deferred.promise;
      
    }



   
   return {
     initialize:initialize
     
   };
 }
 
 
 
 
   
 })();