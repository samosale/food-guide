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
		vm.showVenueInfo = showVenueInfo;
		vm.loaded = 0;
		
		vm.panelOpened = false;

		vm.togglePanel = togglePanel;
        
		activate();


$rootScope.$on('nextPage', function(event,nextPage){
	
	vm.loaded += nextPage.length;
	
	nextPage.forEach(function(val){
		
			vm.venues.push(new Venue(val))
			
		});
		
		
		
		loadMap()
		.then(loadMarkers);
	
})
		///////////////////////////

		function activate() {
			
		loadVenues()
				.then(loadMap)
				.then(loadMarkers);
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