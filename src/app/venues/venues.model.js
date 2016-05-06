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
		this.address = data && data.vicinity ? data.vicinity : data.formatted_address;
		this.logo = data && data.photos ? data.photos[0].getUrl({
    maxWidth: 340
}) : '';
		this.latitude =  data && typeof data.geometry.location.lat === 'function' ? data.geometry.location.lat() : data.geometry.location.lat;
		this.longitude =  data && typeof data.geometry.location.lng === 'function' ? data.geometry.location.lng() : data.geometry.location.lng;
		this.type = data && data.types ? data.types : '';
		this.placeId = data && data.place_id ? data.place_id : '';
	}
})();