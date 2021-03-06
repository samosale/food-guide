(function() {
	'use strict';

	angular
		.module('backoffice')
		.controller('VenueModalController', venueModalController);

	venueModalController.$inject = ['$uibModalInstance', 'options', '$rootScope','Venue'];

	function venueModalController($uibModalInstance, options, $rootScope, Venue) {




		var vm = this;
        vm.venue = options.venue;
		vm.id = options.place_id;
        vm.show = true;
        vm.showAll = showDetails;
		vm.close = close;
        vm.buttonShow = true; 
		
		
        options.idres.then(function(res){
		 
		 console.log(new Venue(res));
		 
		vm.venue = new Venue(res); 
		
		/*
		vm.venue.logo = res.photos ? res.photos[0].getUrl({maxWidth:340}) : res.icon;
		vm.venue.name = res.name;
		vm.venue.address = res.formatted_address;
		vm.venue.type = res.types.join(', ');
		vm.venue.phone = res.formatted_phone_number;
		vm.venue.website = res.website;
		vm.venue.reviews = res.reviews ? res.reviews : [{text:"No reviews"}];
		
		*/
	},function(){})
	
		
		////////////////////////////////////////
		function showDetails () {
			vm.show = !vm.show;
			vm.buttonShow = false;
		}

		function close() {

			if (options.onClose) {
				options.onClose(vm.venue);
			}
			$uibModalInstance.dismiss();
		}
	}
})();