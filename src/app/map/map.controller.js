(function() {
	'use strict';

	angular
		.module('backoffice')
		.controller('MapController', mapController);

	mapController.$inject = ['$q', 'venueService', 'NgMap', 'mapConfig', '$uibModal','serviceMap', 'Venue', '$rootScope'];

	function mapController($q, venueService, NgMap, mapConfig, $uibModal, serviceMap, Venue, $rootScope) {


        var vm = this;
		vm.getAll200 = getAll200;
        vm.rings = false;
		vm.showButton = true;
		vm.mapConfig = mapConfig;
		vm.venues = [];
		vm.showVenueInfo = showVenueInfo;
		vm.loaded = 0;
		
		vm.panelOpened = false;

		vm.togglePanel = togglePanel;
        
		activate();
		
		
/*** Event Recivers ***/


$rootScope.$on('details', function(event,res){
	

	console.log(res);
	
})


$rootScope.$on('nextPage', function(event,nextPage){
	
	vm.loaded += nextPage.length;
	
	nextPage.forEach(function(val){
		
			vm.venues.push(new Venue(val))
			
		});
		
		
		
		loadMap()
		.then(loadMarkers);
	
});


		/*** FUNCTIONS ***/
		
		function activate() {
			
		loadVenues()
				.then(loadMap)
				.then(loadMarkers);
		}
		
		
		function getAll200 () {
			vm.rings = true;
			vm.showButton = false;
		serviceMap.getAll200().then(function(result){
		vm.rings = false;
		console.log(result);
		result.forEach(function(val){
			
			vm.venues.push(new Venue(val))
			
		});
		
		vm.loaded = vm.venues.length;
		
			loadMap()
				.then(loadMarkers);
		
		
		},function(err){console.log(err)});
		
		
		}
				

		function togglePanel() {

			vm.panelOpened = !vm.panelOpened;
		}

		function loadVenues() {

			
				return serviceMap.initialize(NgMap.getMap()).then(function(result){
			vm.loaded += result.length;
		
		
		result.forEach(function(val){
		
			vm.venues.push(new Venue(val))
			
		})
		
		})
			
			
			
		}

		function loadMap() {

			return NgMap.getMap()
				.then(function(map) { return map; })
				.catch(function(e) { console.log(e); });
		}

		function loadMarkers(map) {

			return $q.when(function() {

				for (var i in vm.venues) {
					var mark = buildMarker(vm.venues[i]);
					mark.setMap(map);
				}
			}());
		}

		function buildMarker(venue) {

			var latlng = new google.maps.LatLng(venue.latitude, venue.longitude);

			var mark = new google.maps.Marker({
              position: latlng,
              icon: vm.mapConfig.marker
            });

			mark.addListener('click', function() {
				
					showVenueInfo(venue );
         //  serviceMap.getDetails(NgMap.getMap(), venue.placeId);
			
			
			  
            });

            return mark;
		}



		function showVenueInfo(venue, details) {
console.log(venue)
			$uibModal.open({
				animation: true,
                templateUrl: 'views/venues/venues.venue-modal.html',
                controller: 'VenueModalController as vm',
                resolve: {
                    options: {
                    		venue: venue,
							idres: (function() { return serviceMap.getDetails(NgMap.getMap(),venue.placeId)})()
							
                    	
                    }
                }
			});
        }
	}
})();