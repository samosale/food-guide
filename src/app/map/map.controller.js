(function() {
	'use strict';

	angular
		.module('backoffice')
		.controller('MapController', mapController);

	mapController.$inject = ['$q', 'venueService', 'NgMap', 'mapConfig', '$uibModal','serviceMap', 'Venue', '$rootScope'];

	function mapController($q, venueService, NgMap, mapConfig, $uibModal, serviceMap, Venue, $rootScope) {




		var vm = this;
		

		vm.mapConfig = mapConfig;
		vm.venues = [];
		
		
		
		console.log(vm.venues)
		
		vm.panelOpened = false;

		vm.togglePanel = togglePanel;
        
		activate();


$rootScope.$on('nextPage', function(event,nextPage){
	
	
	nextPage.forEach(function(val){
		
			vm.venues.push(new Venue(val))
			
		});
		
		
		
		loadMap()
		.then(loadMarkers);
	
})
		///////////////////////////

		function activate() {
			
			serviceMap.initialize(NgMap.getMap()).then(function(result){
			
		
		
		result.forEach(function(val){
		
			vm.venues.push(new Venue(val))
			
		})
		
		})
				.then(loadMap)
				.then(loadMarkers);
		}

		function togglePanel() {

			vm.panelOpened = !vm.panelOpened;
		}

		function loadVenues() {

			var center = vm.mapConfig.center.split(',');


			return venueService
				.search(center[0], center[1], 200)
				.then(function(venues) { 
					vm.venues = venues;
					return true;
				});
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
              showVenueInfo(venue);
            });

            return mark;
		}

		function showVenueInfo(venue) {

			$uibModal.open({
				animation: true,
                templateUrl: 'views/venues/venues.venue-modal.html',
                controller: 'VenueModalController as vm',
                resolve: {
                    options: function() {
                    	return {
                    		venue: venue
                    	}
                    }
                }
			});
        }
	}
})();