var Twit = require('twit');
var cfg = require('./config.json');

var t = new Twit(cfg.twitter);

var stream = t.stream('statuses/filter', { track: 'webrtc,nodejs,easyrtc' });

stream.on('tweet', function (tweet) {
  console.log( JSON.stringify( tweet.entities.hashtags));
  if (tweet.user.id_str === cfg.my_id) return;
  t.post('statuses/update', { status: tweet.text }, function(err, data, response) {
    if (err) console.log(err);
  });
});

