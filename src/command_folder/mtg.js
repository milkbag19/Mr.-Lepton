var scryfall = require("scryfall-client");

module.exports = {
    command: function (message, args) {
        var searchType = args[1];
		var cardName = args.slice(2, args.length);
		console.log(searchType + " " + cardName);
		if (searchType == "auto") {
			scryfall.autocomplete(cardName).then(function (list) {
				var results = list.join("\n");
				var covidEmbed = {
					title: "Search Results",
					color: 0x00AE86,
					fields: [
						{
							"name": "Results",
							"value": "" + results,
							"inline": true
						}
					]
				};

				message.channel.send("Serving Data Sir.", { embed: covidEmbed });

			}).catch(function (err) {
				console.log(err); // a 404 error
			});
		} else if (searchType == "card" || searchType == "search") {
			scryfall.getCard(cardName, "exactName").then(function (card) {

				var covidEmbed = {
					title: "Card Found",
					color: 0x00AE86,
					image: {
						url: card.image_uris.large,
						width: 400
					},
					fields: [
						{
							"name": "Card Name",
							"value": "" + card.name,
							"inline": true
						}
					]
				};

				message.channel.send("Serving Data Sir.", { embed: covidEmbed });


			}).catch(function (err) {
				scryfall.autocomplete(cardName).then(function (list) {
					var results = list.join("\n");
					var covidEmbed = {
						title: "Card not found! Here are some cards you might be looking for!",
						color: 0x00AE86,
						fields: [
							{
								"name": "Results",
								"value": "" + results,
								"inline": true
							}
						]
					};

					message.channel.send("Serving Data Sir.", { embed: covidEmbed });

				}).catch(function (err) {
					console.log(err); // a 404 error
				});
			});
		}
    }
}