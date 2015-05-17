// import the webserver module, and create a server
var server = require('webserver').create();

var port = require('system').env.PORT || 8080; // default back to 8080

// start a server on port 8080 and register a request listener
server.listen(port, function(request, response) {
	var page = new WebPage();
	page.settings.userAgent = 'User-Agent: iOS / Safari 7: Mozilla/5.0 (iPad; CPU OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B554a Safari/9537.53';
	page.open("http://www.vodafone.com.eg/mobile-internet/mobi/management/mainPage?lang=ar&m={$MD5_HASH_HERE}", function(){
		var events = page.evaluate(function(){
			var consumedMainQuota = document.getElementById("consumedMainQuota").innerHTML.replace(/( |\n)/gi,"");
			var remainingMainQuota = document.getElementById("remainingMainQuota").innerHTML.replace(/( |\n)/gi,"");
			var balance = document.getElementsByClassName("Unified_Renewal_Now_txt")[0].innerHTML.replace(/( |\n)/gi,"");
			var daysleft = document.getElementsByClassName("Unified_Renewal_Days_txt")[0].innerHTML;
			return {"balance" : balance, "consumedMainQuota" :consumedMainQuota, "remainingMainQuota": remainingMainQuota, "daysleft":daysleft};
		});

		response.setEncoding("utf-8");
		response.headers = {"Cache": "no-cache", "Content-Type": "application/json"};
		response.statusCode = 200;
		response.write(JSON.stringify(events));
		response.close();
	  
		page.close();

	});
});