(function() {
	'use strict';

	angular
		.module('backoffice')
		.factory('venueService', venueService);

	 
    var counter = 0;
    
    venueService.$inject = ['$q','$rootScope','$http'];
      
 function venueService ($q, $rootScope, $http) {
   
    
  
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
          types: ['food','restaurant','cafe']
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
              
        
              },2000)
              
              
              
              deferred.resolve(results);
        
              return results;
            
              }
  
            }
            
      
          return deferred.promise;
        
      }



    var getAll200 = function(){
      
      return $http({method:'GET',url:'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/radarsearch/json?location=44.7866,20.4489&radius=15000&type=cafe&rankby=distance&key=AIzaSyAj_WBCu0w5B9-N8uiTzUs_ArygMHf15ac'}).then(function(result){
        return result.data.results;
        
        
      },function(err){
        console.log(err)
      })
      
      
    } 

    var getDetails = function(mapp, id) {
      var deferred = $q.defer();
    
      var request = {
      placeId: id
    };
    
    
    mapp.then(function(res){
          
          
        
          var service = new google.maps.places.PlacesService(res);
          
          service.getDetails(request, callbackj);
          })
    
    
    
    function callbackj(place, status) {
      
      
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        
        $rootScope.$emit('details', place)
        deferred.resolve(place);
      }
    }
    
    
        return deferred.promise;
      
    }
      
      
      
   return {
     initialize:initialize,
     getAll200: getAll200,
     getDetails:getDetails
   };
 }
 
 
 
	
	
	
})();