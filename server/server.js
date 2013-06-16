
var util = Meteor.require( 'util' );

var ops = {
	APIKey: 'e8b01c3e39e30b86c4a714953f7cd0fd'
};

var Forecast = Meteor.require( 'forecast.io' );
var forecast = new Forecast( ops );

var Fiber = Meteor.require( 'fibers' );

var carriers = {

	'att': '@txt.att.net',
	'boost': '@myboostmobile.com',
	'sprint': '@messaging.sprintpcs.com',
	'tmobile': '@tmomail.net',
	'uscellular': '@email.uscc.net',
	'verizon': '@vtext.com',
	'metropcs': '@mymetropcs.com',
	'cellularsouth': '@csouth1.com',
	'ntelos': '@pcs.ntelos.com'

};

var messages = {
	nice: [
		'Forecast: 70* Sunny - You don\'t need anything extra to enjoy this day',
		'Forecast 70* Sunny - Clear skies and sunny!',
		'Forecast 70* Sunny - It\'s a beautiful day'
	],
	hot: [
		'Forecast: 100+ - It\'s hot. Wear sunscreen.',
		'Forecast: 100+ - Drink plenty of water today. The heat index is high!',
		'Forecast: 100+ - Rest in the shade if you\'re out and about. It\'s going to be a scorcher today. '
	],
	cold: [
		'Forecast: Under 15 - Hats, gloves, scarves, etc. Today calls for it all.',
		'Forecast: Under 15 - Don\'t forget your coat.',
		'Forecast: Under 15 - Your parka won\'t cut it today. It\'s cold. '
	],
	rain: [
		'Forecast: Raining - Grab your umbrella before you head out.',
		'Forecast: Raining - This drizzle calls for a rain jacket. ',
		'Forecast: Raining - Unless you like wet socks, rain boots are recommended.'
	],
	snow: [
		'Forecast: Snowy - You know that ski coat in the back of your closet? Yeah, it\'s snowing THAT bad.',
		'Forecast: Snowy - Protect your feet! Grab your snow boots.',
		'Forecast: Snowy - We recommend you leave early for work. The ice is bad.'
	],
	nippy: [
		'Forecast: Nippy - A little nippy, we recommend a jacket.',
		'Forecast: Nippy - A long sleeve will do this time.',
		'Forecast: Nippy - A little chilly, you may need an extra layer later.'
	],
	mild: [
		'Forecast: Mild - Its almost tank top weather.',
		'Forecast: Mild -Lather on the sunscreen just in case.',
		'Forecast: Mild -No need for the A/C today.'
	]

}

function gre ( array ) {

	return array[Math.floor(Math.random()*array.length)]

}

function getMessage( data ) {

	if ( data.icon && data.icon === 'rain' ) {

		return gre( messages.rain );

	} else if ( data.icon && data.icon === 'snow' ) {

		return gre( messages.snow );

	} else if ( data.temperatureMax < 15 ) {

		return gre( messages.cold );

	} else if ( data.temperatureMax > 91 ) {

		return gre( messages.hot );

	} else if ( data.temperatureMax > 76 && 
				data.temperatureMax < 90 &&
				data.icon &&
				data.icon === 'clear-day' ) {

		return gre( messages.nice );

	} else if ( data.temperatureMax > 35 && 
				data.temperatureMax < 59 ) {

		return gre( messages.nippy );

	} else if ( data.temperatureMax > 60 && 
				data.temperatureMax < 75 ) {

		return gre( messages.mild );

	}

}

Meteor.startup(function () {

	process.env.MAIL_URL = 'smtp://app16323043%40heroku.com:R-7HISkxtCqqXK6FPMz5FQ@smtp.mandrillapp.com:587';

	Users.find().forEach(function ( user ) {

		Meteor.call('setupTextTimer', user );

	});

});

// In your server code: define a method that the client can call
Meteor.methods({

	setupTextTimer: function ( user ) {

		var split = user.time.split(':');

		var userHours = parseInt( split[0] );
		var userMinutes = parseInt( split[1] );

		var now = new Date;

		var hoursDiff = userHours - now.getHours();
		var minDiff = userMinutes - now.getMinutes();

		if ( hoursDiff < 0 ) { hoursDiff += 24; }
		if ( minDiff < 0 ) { minDiff += 60; }

		var totalSeconds = ( hoursDiff * 60 * 60 ) + ( minDiff * 60 ) - now.getSeconds();


		setTimeout(function () {

			function send () {
				console.log('sent!');
				forecast.get(user.latitude, user.longitude, function (err, res, data) {

					var message = getMessage( data.daily.data[0] );

					Fiber(function () {

						Email.send({
							to: user.number + carriers[ user.carrier ],
							from: 'daily@keepmedry.org',
							subject: 'Keep Me Dry',
							text: message
						});

					}).run();
					
				});
			}

			send();
			setInterval(send, 1000 * 60 ); //* 60 * 24)

		}, 1000 * totalSeconds );

		Email.send({
			to: user.number + carriers[ user.carrier ],
			from: 'daily@keepmedry.org',
			subject: 'Keep Me Dry',
			text: 'Thanks for signing up! You\'ll be receiving your first forecast text soon.'
		});

		// name, time, latitude, longitude

		

	}
});

