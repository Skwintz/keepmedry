
Meteor.startup( function () {
	Email.send({
	  to: '4023040146@vtext.com',
	  from: 'pnispel@gmail.com',
	  subject: 'IT GON\' RAIN!',
	  text: 'Get cho rain jacket on, trick!',
	  replyTo: 'pnispel@gmail.com',
	});
});
