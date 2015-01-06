var Twit = require('twit');
var cfg = require('./config.json');

var t = new Twit(cfg);

var stream = t.stream('statuses/filter', { track: 'webrtc' });

stream.on('tweet', function (tweet) {
  console.log(tweet)
})

