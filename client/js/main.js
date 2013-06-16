Template.main.doPosition = function ( position ) {

	var time = $( '.form [name="contacttime"]' ).val();
	var number = $( '.form [name="number"]' ).val();
	var carrier = $( '.form select' ).val();

	$( '.form [name="contacttime"]' ).val('');
	$( '.form [name="number"]' ).val('');
	$( '.form select' ).val('');

	number = number.replace(/[^0-9]/g, '');

	if ( number.substr( 0, 1 ) === '1' ) {
		number = number.substr( 1, number.length );
	}

	if ( number.length != 10 ) {
		return;
	}

	

	// var id = Users.insert({

	// 	time: time,
	// 	number: number,
	// 	carrier: carrier,
	// 	latitude: position.coords.latitude,
	// 	longitude: position.coords.longitude

	// });

	// Meteor.call('setupTextTimer', Users.findOne( {_id: id} ).fetch() );

	var user = {
		time: time,
		number: number,
		carrier: carrier,
		latitude: position.coords.latitude,
		longitude: position.coords.longitude
	};

	Meteor.call('setupTextTimer', user );

	$('#framefour p.wait').hide();
	$('#framefour p.success').show();

};

Template.main.events = {
	'submit .form': function ( e ) {

		$('#framefour p.wait').show();

		e.preventDefault();
		navigator.geolocation.getCurrentPosition( Template.main.doPosition );

	}
}