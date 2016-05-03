(function() {
	'use strict';

	angular
		.module('backoffice')
		.factory('Venue', venueFactory);

	venueFactory.$inject = [];

	function venueFactory() {

		return Venue;
	}

	function Venue(data) {

		this.name = data && data.name ? data.name : '';
		this.address = data && data.vicinity ? data.vicinity : '';
		this.logo = data && data.photos ? data.photos[0].getUrl({
    maxWidth: 640
}) : '';
		this.latitude = data && data.geometry.location ? data.geometry.location.lat() : 0;
		this.longitude = data && data.geometry.location ? data.geometry.location.lng() : 0;
		this.type = data && data.types ? data.types : '';
	}
})();