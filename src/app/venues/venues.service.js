(function() {
	'use strict';

	angular
		.module('backoffice')
		.service('venueService', venueService);

	venueService.$inject = ['$http', 'Venue'];

	function venueService($http, Venue) {

		var service = this;

		service.search = search;

		/////////////////////////////////////

		function search(latitude, longitude, radius) {

			// TODO: search venues by radius from specific geolocation
			// NOW: return all venues (this is DEMO app)
			return $http({
				method: 'GET',
				url: '/data/venues.data.json'
			})
			.then(function(response) {

				var result = [];

				for (var i in response.data) {

					result.push(new Venue(response.data[i]));
				}
				return result;
			});
		}
	}
	
	
	
	
})();