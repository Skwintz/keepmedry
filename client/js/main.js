Template.main.doPosition = function ( position ) {

	var name = blah;
	var time = blah;
	var number = blah;
	var carrier = blah;

	number = number.replace("-","");
	number = number.replace(" ","");
	if ( number.substr( 0, 1 ) === '1' ) {
		number = number.substr( 1, number.length );
	}
	if ( number.length != 10 ) {
		return;
	}

	var id = Users.insert({

		name: name,
		time: time,
		number: number,
		carrier: carrier,
		latitude: position.coords.latitude,
		longitude: position.coords.longitude

	});

	Meteor.call('setupTextTimer', Users.findOne( {_id: id} ).fetch() );

};

Template.main.events = {
	'submit #form': function ( e ) {

		navigator.geolocation.getCurrentPosition( Template.main.doPosition );

	}
}