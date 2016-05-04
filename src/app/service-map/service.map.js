  
  (function() {
	'use strict';

	angular
		.module('backoffice')
		.factory('serviceMap', serviceMap);
    
    var counter = 0;
serviceMap.$inject = ['$q','$rootScope'];
  
 function serviceMap ($q, $rootScope) {
   
   

   var map;
   var marker;
   var infowindow;
   
  var initialize = function initialize(mapp) {

      var deferred = $q.defer();
      

      var pos = new google.maps.LatLng(44.7866,20.4489);
      var center = new google.maps.LatLng(44.7866,20.4489);

    
      var request = {
        location: pos,
        radius: 8000,
        types: ['food']
      };

      
     mapp.then(function(res){
       
       
    
      var service = new google.maps.places.PlacesService(res);
      
      service.nearbySearch(request, callback);
       })




function callback(results, status, pagination) {
   
             counter++;
       if(counter !==1){
     $rootScope.$emit('nextPage',results)
       }
      if (status == google.maps.places.PlacesServiceStatus.OK) {

      
      setTimeout(function(){
        
        if (pagination.hasNextPage) {
         

        
        pagination.nextPage(results);

    }
      

      },3000)
      
       
       
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