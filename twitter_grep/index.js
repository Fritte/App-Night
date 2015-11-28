var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'XpJLyfz9KicaDKotOWjhejT89',
  consumer_secret: 'uZSPYqXjHfk8MP0LLktBG1So7v8prWv9C5ZT0SDMPCc1AKv8av',
  access_token_key: '3294954165-gZ9b3vz3nhnmAU1vDbvk9O6WCieRO6iFn5oZpcY',
  access_token_secret: 'lO0jD9iJyHDDsQi0phXwxI7ryirlFgEgZl7Ysxks1EQ1j'
});

var params = { 
  screen_name: 'realdonaldtrump', //'HillaryClinton',
  count: 200,
  exclude_replies: true,
  include_rts: false
};

var callsLeft = 10;

function loadTweets(start_id) {

  var p = params;
  if (start_id) {
    p.max_id = start_id;
  }

  client.get('statuses/user_timeline', p, (error, tweets, response) => {
      if (!error) {
        console.log(tweets.map( (t) => t.text ).reduce( (l, t) => l + t + '\n' ));
        if (callsLeft > 0) {
          callsLeft--;
          return loadTweets(tweets[tweets.length-1].id);
        }
      }
  });
}

loadTweets();
