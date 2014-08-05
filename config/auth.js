// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
	'twitterAuth' : {
		'consumerKey'		: 'krrbI0DVKcr0oCvc1PUJwVKcw',
		'consumerSecret'	: 'R4HTK5MfblFQUyaefwlcaPPjyjmzipE8FIIVpPmcTe5N8r5eup',
		// 'callbackURL'		: 'http://localhost:3000/auth/twitter/callback'
		'callbackURL'		: 'http://physical-tweets.herokuapp.com/auth/twitter/callback'
	}
};