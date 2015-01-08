var Twit = require('twit');
var cfg = require('./config.json');

var t = new Twit(cfg.twitter);

var lastRT = new Date();

var stream = t.stream('statuses/filter', { track: 'webrtc,nodejs,easyrtc,simplewebrtc' });

var MINUTE = 60 * 1000;

stream.on('tweet', function (tweet) {
  
  var now = new Date();
  var rom = JSON.stringify(tweet.place).match(/Romania/);
  
  
  if (tweet.lang !== 'en' && tweet.lang !== 'ro') return;
  if (tweet.user.id_str === cfg.my_id) return;
  if (tweet.text.match(/'^RT /)) return;
  if (tweet.entities.user_mentions.length > 0) return;
  
  if ( !(rom || Math.random() < 0.25) ) return;
  if ( !rom && (now.getTime() - lastRT.getTime()) < 5 * MINUTE ) return;
  
  console.log( tweet );
  
  lastRT = now;
  t.post('statuses/retweet/:id', { id: tweet.id_str }, function(err, data, response) {
    if (err) console.log(err);
  });
});

