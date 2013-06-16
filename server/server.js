
var util = Meteor.require( 'util' );

var ops = {
	APIKey: 'e8b01c3e39e30b86c4a714953f7cd0fd'
};

var Forecast = Meteor.require( 'forecast.io' );
var forecast = new Forecast( ops );

var latitude = 40.8000;
var longitude = -96.666;

function done ( data ) {
	console.log( data );
}

Meteor.startup(function () {
	process.env.MAIL_URL = 'smtp://app16323043%40heroku.com:R-7HISkxtCqqXK6FPMz5FQ@smtp.mandrillapp.com:587';

	//   // In your client code: asynchronously send an email
	// Meteor.call('sendEmail',
	//             '4023040146@vtext.com',
	//             'bob@example.com',
	//             'Hello from Meteor!',
	//             'This is a test of Email.send.');

	forecast.get(latitude, longitude, function (err, res, data) {
		done(data);
	});
});

// In your server code: define a method that the client can call
Meteor.methods({
	sendEmail: function (to, from, subject, text) {
		check([to, from, subject, text], [String]);

		// Let other method calls from the same client start running,
		// without waiting for the email sending to complete.
		this.unblock();

		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text
		});
	}
});

