var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'XpJLyfz9KicaDKotOWjhejT89',
  consumer_secret: 'uZSPYqXjHfk8MP0LLktBG1So7v8prWv9C5ZT0SDMPCc1AKv8av',
  access_token_key: '3294954165-gZ9b3vz3nhnmAU1vDbvk9O6WCieRO6iFn5oZpcY',
  access_token_secret: 'lO0jD9iJyHDDsQi0phXwxI7ryirlFgEgZl7Ysxks1EQ1j'
});



var params = { 
  screen_name: 'RealBenCarson', // 'HillaryClinton', 'realDonaldTrump', 'RealBenCarson'
  count: 200,
  exclude_replies: true,
  include_rts: false
};

var callsLeft = 10;
// produce blob
var isBlob = process.argv[2] === 'blob'
var res = []

// console.log(isBlob ? 'Concatening tweets to text blob' : 'Concatenating tweets objects'); 


function loadTweets(input, start_id) {
  var p = params;
  if (start_id) {
    p.max_id = start_id;
  }
  client.get('statuses/user_timeline', p, (error, tweets, response) => {
    if(error){
      throw Error(" An error occured calling Twitter: " + error); 
    }

    if(callsLeft == 0) {
      if(isBlob){
        console.log(input.map( (t) => t.text ).reduce( (l, t) => l + t + '\n' ));
      }
      else{
        var filteredList = input.map( (t) => { return {'text' :  t.text, 'id' : t.id, 
            'retweet_count' : t.retweet_count, 'source' : t.source, 
            'favorite_count' : t.favorite_count }; } );
        console.log(JSON.stringify(filteredList));
      }
      return;
    }

    callsLeft--;
    loadTweets( input.concat(tweets), tweets[tweets.length-1].id );
  });
}

loadTweets([]);