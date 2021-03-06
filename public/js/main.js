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

function update3dTweet (input) {
	if (input) {
		text = input;
	} else {
		randTweet = tweetArray[Math.floor(Math.random() * tweetArray.length)];
		text = randTweet;
	}
	refreshText();
}


(function () {

		Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
			return size;
		};

		// Init Variables
		var fullURL   = document.URL,
			parsedURL,
			ENVpath,
			AUTHpath,
			LOCALpath = 'http://localhost:3000/',
			LIVEpath = 'http://physical-tweets.herokuapp.com/',
			tweetsTemplate,
			shownTweets = [],
			notShownTweets = [],
			sadTweetsLength,
			nextRandTweet,
			tweets,
			twitterhandle;

		//					//
		//	THREEJS TWEETS	//
		//					//

		$('.create-tweet').on('click', function () {
			getRandTweet();
			console.log(randTweet);
		});

		// Init App Environment
		if (fullURL.indexOf(LIVEpath) > -1) {
			parsedURL = fullURL.slice(25);
			AUTHpath = LIVEpath;
			ENVpath = LIVEpath + 'tweets/';
		} else if (fullURL.indexOf(LOCALpath) > -1) {
			parsedURL = fullURL.slice(22);
			AUTHpath = LOCALpath;
			ENVpath = LOCALpath + 'tweets/';
		}

		var methods = {
			init: function () {
				console.log('Physical Tweets js init!');
				twitterhandle = $('.ejs-context').html();
				// methods.showIntroSadTweets();

				// var source = $('#tweets-template').html();
				// tweetsTemplate = Handlebars.compile( source );

				// var source = $('#tweets-share-template').html();
				// tweetsShareTemplate = Handlebars.compile( source );

				if (parsedURL.length > 0) {
					// alert('getSadTweets!');
					methods.getSadTweets('url', twitterhandle);	
				}

				setTimeout(function () {
					$('.middle-ui h2').fadeIn();
				}, 3000);

				$('.middle-ui h2').on('click', function (e) {
					e.preventDefault();
					console.log('create your TweetChain!');
					window.location.href = AUTHpath + "auth/twitter";
				});

				$('.get-tweets').on('click', function (e) {
					e.preventDefault();
					console.log('get-tweets-button!');
					window.location.href = AUTHpath + "auth/twitter";
				});

				$('.post-tweet').on('click', function (e) {
					e.preventDefault();
					console.log('post-tweet!');
					//window.location.href = AUTHpath + "auth/twitter";
				});

				$('.update-svg').on('click', function (e) {
					e.preventDefault();
					console.log('update-svg!');
					var text = $('.main-text-svg');
					var text = text[0].childNodes[1].innerHTML = 'new text';
					console.log(text);
					// text.attr({ text: 'my new text'});
				});

				$('.tweets-button').on('click', function (e) {
					e.preventDefault();
					TweetChain.selectCustomChainTab('tweets');
				});

				$('.materials-button').on('click', function (e) {
					e.preventDefault();
					TweetChain.selectCustomChainTab('materials');
				});

				// Init getSadTweets input form event handler
				$('.get-sadtweets-button').on('click', function (e) {
					e.preventDefault();
					console.log('get-sadtweets-button!!');
					window.location.href = AUTHpath + "auth/twitter";


					//////////////////////////
					//	TWITTER FORM INPUT  //
					//////////////////////////

					// if ($('.twitter-form-input').val().length -1 > 0) {
					// 	$(this).fadeOut(function () {
					// 		$('.submit-loading-icon').fadeIn();
					// 	});

					// 	// methods.getSadTweets('input');
					// }
				});
			},

			showIntroSadTweets: function(){
				$( '.wrapper' ).fadeIn(2000);
				$( '.field' ).on( 'click', function() {
					$('.field').val('@');
				});
			},

			showSadTweets: function (context) {
				// audioElement.play();	//call audio

				var v = document.getElementsByTagName("video")[0];
				v.play();

				
				$('.footer_tweets').fadeIn(2000); // fadein second footer
				$('.gray').fadeIn(2000);
				
				// retrieve tweets from template in the DOM								
				tweets 		= $('.tweet');
				var firstTweet 	= tweets[0];
				var firstTweetID = $(firstTweet).find('.tweet-id').html();
				// alert(firstTweetID);
				sadTweetsLength = tweets.length;
				console.log(sadTweetsLength);
				// console.log(tweets);

				if (context === 'input') {
					$('.intro-wrapper').fadeOut(function () {
						methods.fadeFunction($(firstTweet), firstTweetID);
					});
				} else if (context === 'url') {
					// $('.user').fadeIn(function () {
						// self = this;
						// setTimeout(function () {
							$('.user').fadeOut(function () {
							methods.fadeFunction($(firstTweet), firstTweetID);
							});
						// }, 3000);
					// });
				}
			},
			fadeFunction: function (tweetElement, tweetElementID) {
				var tweetElementID = $(tweetElement).find('.tweet-id').html();
				// var tweetElementID = $(tweetElement).children().children()[0].innerHTML;
				// alert(tweetElementID);
				
				// console.log('notShownTweets');
				// console.log(notShownTweets.length);

				console.log('tweetElement');
				console.log(tweetElement);
				console.log('tweetElementID: ' + tweetElementID);

				shownTweets.push(tweetElementID);
				var index = notShownTweets.indexOf(tweetElementID);
				notShownTweets.splice(index, 1);
				// console.log('notShownTweets');
				// console.log(notShownTweets.length);
				// console.log(notShownTweets.length);

				sadTweetsLength--;
				console.log(sadTweetsLength);


				console.log('tweetElement');
				console.log(tweetElement);
				// console.log('shownTweets:');
				// console.log(shownTweets);
				// console.log('sadTweetsLength: ' + sadTweetsLength);

				$(tweetElement).fadeIn( 1000, function() {
					$(this).transition({scale: 1.06}, 5000);
					$(this).fadeOut( 1000, function () {
						methods.getNextRandTweet();
					});
				});
			},
			getNextRandTweet: function () {
				var randNum = Math.floor(Math.random() * tweets.length);
				var randTweet = tweets[randNum];
				var randTweetID = $(randTweet).find('.tweet-id').html();

				if (sadTweetsLength > 0 && notShownTweets.indexOf(randTweetID) > -1) {
					methods.fadeFunction(randTweet, randTweetID);
				} else if (sadTweetsLength > 0 && notShownTweets.indexOf(randTweetID) === -1) {
					methods.getNextRandTweet();
				} else if (sadTweetsLength === 0) {
					$('.fin').fadeIn(1000);
				} else {
					console.log('WTF!!!');
				}


				// var randTweetID = notShownTweets[randNum];
				// randTweet = $(randTweetID);


				// randTweet = $('.tweet-id:contains("' + randTweetID + '")')[0];
				// console.log(randTweet);
				// var randTweetID = $(randTweet).find('.tweet-id').html();
				

				// var randTweetID = $(randTweet).children().children()[0].innerHTML;
				// console.log('randTweetID: ' + randTweetID);
				// console.log('shownTweets.indexOf');
				// console.log(shownTweets.indexOf(randTweetID));


				// var indexOfSadTweets = shownTweets.indexOf(randTweetID);
				// console.log('indexOfSadTweets: ' + indexOfSadTweets);

				// if (sadTweetsLength > 0 && indexOfSadTweets === -1) {
				// 	console.log('randTweet is not in ShownTweetsArray');		
				// 	methods.fadeFunction(randTweet, randTweetID);
				// } else if (sadTweetsLength > 0 && indexOfSadTweets > -1) {
				// 	console.log('getNextRandTweet');
				// 	methods.getNextRandTweet();
				// } else if (sadTweetsLength === 0) {
				// 	$('.fin').fadeIn(1000);
				// } else {
				// 	console.log('WTF!!!');
				// }
			},
			getSadTweets: function (context, twitterhandle_url) {
				console.log('getSadTweets: ' + context + ' ' + twitterhandle_url);

				////////////////////////
				// DEFINE AJAX PARAMS //
				////////////////////////

				var params = {
					url: '',
					dataType: 'json',
					success: function (data) {
						console.log(data);
						var dataLength = Object.size(data);
						console.log(dataLength);

						if (dataLength > 0) {
							// history.pushState(null, null, twitterhandle);

							////////////////////////////////
							// HANDLE BAR SUCCESS ACTIONS //
							////////////////////////////////

							// tweetContainer = $('.tweets-container');
							// tweetContainer.empty();

							$.each(data, function (idx, obj) {
								var tweet = {
									id: obj.id,
									text: obj.text,
									favorite_count: obj.favorite_count,
									retweet_count: obj.retweet_count,
									username: obj.username,
									screenname: obj.screenname,
									link: obj.twitter_source_link,
									profile_image: obj.profile_image,
									profile_background: obj.profile_background,
									created_at: obj.created_at,
									relative_created_at: obj.relative_created_at,
									format_created_at: obj.format_created_at
								}

								notShownTweets.push(obj.id);
								// console.log(obj.text);
								// var html = tweetsTemplate(tweet);
								// tweetContainer.append(html);
							});
							console.log('Not shown Tweets!');
							console.log(notShownTweets);

							history.pushState(null, null, twitterhandle);
							// methods.showSadTweets(context);
							// 	console.log(html);

							var textFromTweet;

							console.log('textFromTweet: ' + textFromTweet);
							

							dataObjectCount = 0;
							for (var key in data) {
								if (data.hasOwnProperty(key)) {
									if (dataObjectCount === 0) {
										// alert(key + " -> " + data[key]);
										textFromTweet = data[key].text;
										update3dTweet(textFromTweet);

										dataObjectCount++;
									} else {
										// alert('anothertweet');
									}
								  
								}
								
			
							}

							// data[Object.keys(data)[0].text];

								
							// } // end of for loop
						} else {
							$('.page.user').fadeOut(function () {
								$('.notweets').fadeIn();
							});
						}	
					} // end of success
				}// end of params

				/////////////////////////////////
				// DEFINE CONTEXT OF AJAX CALL //
				/////////////////////////////////

				if (context === 'url') {
					params.url = ENVpath + twitterhandle_url
					// var html = tweetsShareTemplate(parsedURL);

					// var html = tweetsShareTemplate(parsedURL);
					// tweetShareContainer = $('.tweets-share-container');
					// tweetShareContainer.append(html);

				} else if (context === 'input') {
					// fetch data from input form
					var raw_twitterhandle = $('.twitter-form-input').val();
					var twitterhandle = raw_twitterhandle.substr(1);
					params.url = ENVpath + twitterhandle
					
					var html = tweetsShareTemplate(parsedURL);
					tweetShareContainer = $('.tweets-share-container');
					tweetShareContainer.append(html);
				}// enf of if statement


				///////////////
				// AJAX CALL //
				///////////////

				$.ajax(params);
			}, // end of getSadTweets
			selectCustomChainTab: function (tab) {
				switch (tab) {
					case 'tweets':
						$('.materials-button').removeClass('selected');
						$('.materials-wrapper').removeClass('selected');
						$('.tweets-button').addClass('selected');
						$('.tweets-wrapper').addClass('selected');
						break;
					case 'materials':
						$('.tweets-button').removeClass('selected');
						$('.tweets-wrapper').removeClass('selected');
						$('.materials-button').addClass('selected');
						$('.materials-wrapper').addClass('selected');
						break;
				}
			},
			clearSVGtext: function () {
				console.log('clearSVGtext!');
				// console.log(text);
				// console.log(svgText);
				$('.main-text-svg')[0].childNodes[1].innerHTML = '';
				
			},
			createSVGtext: function () {
				console.log('createSVGtext!');
				$('.main-text-svg')[0].childNodes[1].innerHTML = text;
			}
		}// end of method
		window.TweetChain = methods;
})();