(function () {
	console.log('main.js!');
	var randTweet;

	var tweetArray = [
		'first cool tweet!',
		'visual tweet',
		'such cool tweet',
		'3d tweet',
		'wow tweet',
		'such hashtag',
		'@wow',
		'cool nice'
	];

	function getRandTweet () {
		randTweet = tweetArray[Math.floor(Math.random() * tweetArray.length)];
		text = randTweet;
		refreshText();
	}

	$('.create-tweet').on('click', function () {
		getRandTweet();
		console.log(randTweet);
	});
})();