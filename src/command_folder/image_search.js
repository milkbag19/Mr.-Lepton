var gis = require('g-i-s');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function imageExists(image_url){
	var http = new XMLHttpRequest();
	http.open('HEAD', image_url, false);
	http.send();
	if (http.status == "404") {
		console.log("File doesn't exist");
		return false;
	} else {
		console.log("File exists");
		return true;
	}
}

module.exports = {
	command: function (message, args) {
		if (message.channel.nsfw) {
			if (args[1] != "" && args[1] != null) {
				var search = args.slice(1, args.length);
				console.log(search.join(" "));
				gis(search.join(" "), function (err, res) {
					if (err) throw err;
					while (true) {
						rand = Math.round(Math.random() * 25);
						url = "";
						url = res[rand - 1].url
						if (imageExists(url)) {
							break;
						} else {
							console.log(rand);
						}
					}
					var dexEmbed = {
						color: 0x00AE86,
						image: {
							url: res[rand].url,
							width: 100,
							height: 100
						},
					};
					message.channel.send("Your image sir.", {
						embed: dexEmbed
					});
					console.log(url);
				});
			} else {
				message.channel.send("**Search query was empty.  Please retry.**");

			}
		} else {
			message.channel.send("**This command can only be used within NSFW channels due to the nature of it.**");
		}
    }
}