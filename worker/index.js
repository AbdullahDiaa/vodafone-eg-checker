var request = require('request'),
	pushbots = require('pushbots');

setInterval(function(){
	request('SERVER_URL', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		  var data = JSON.parse(body);
		  var balance = data.balance.match(/[+-]?\d+(\.\d+)?/g)[0];
		  var consumedMainQuota = data.consumedMainQuota.match(/[+-]?\d+(\.\d+)?/g)[0];
		  var daysleft = data.daysleft.match(/[+-]?\d+(\.\d+)?/g)[0];
		  var remainingMainQuota = data.remainingMainQuota.match(/[+-]?\d+(\.\d+)?/g)[0];
	  
		  var Pushbots = new pushbots.api({
		      id:'PUSHBOTS_APP_ID',
		      secret:'PUSHBOTS_APP_SECRET'
		  });
		 Pushbots.setMessage("Balance: " + balance + "EGP, Consumed: " + consumedMainQuota + " remaining: " + remainingMainQuota + " - " +daysleft+ " days left", [0]);

		  Pushbots.push(function(response){
		      console.log(response);
		  });
	  
	  }
	});
}, 43200000 );