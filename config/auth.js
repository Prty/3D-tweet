// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
	'twitterAuth' : {
		'consumerKey'		: 'irAALcpDJdoBdoYxnSUENB0DZ',
		'consumerSecret'	: '2XvadKZS4TV5nPgUZ15EI1WP9vu8zFC03htrUoGlnjt03m0vpr',
		'callbackURL'		: 'http://localhost:3000/auth/twitter/callback'
		// 'callbackURL'		: 'http://physical-tweets.herokuapp.com/auth/twitter/callback'
	}
};