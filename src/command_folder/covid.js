var request = require('request');
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
module.exports = {
    command: function (message, args) {
        let options = {json: true};


		request('https://api.covid19api.com/summary',options, (err, res, body) => {


			if (!err) {
				if (res.statusCode == 200) {
					if (args[1] != null || args[1] != "" && typeof args[1] !== 'undefined') {
						if(args[1] == "global"){
							var foot = {
								text: 'Source : https://covid19api.com/#details',
								icon_url: 'https://covid19api.com/logo-color-sm.png'

							};
							var covidEmbed = {
								title: "Global Stats",
								color: 0x00AE86,
								image: {
									url: "https://i.redd.it/jdix6i0lsyny.png",
									width: 80
								},
								fields: [
									{
										"name": "Total Cases",
										"value": "" + numberWithCommas(body.Global.TotalConfirmed),
										"inline": true
									},
									{
										"name": "Total Deaths",
										"value": "" + numberWithCommas(body.Global.TotalDeaths),
										"inline": true
									},
									{
										"name": "Confirmed Cases Today",
										"value": "" + numberWithCommas(body.Global.NewConfirmed)

									},
									{
										"name": "Confirmed Deaths Today",
										"value": "" + numberWithCommas(body.Global.NewDeaths),
										"inline": true
									},
									{
										"name": "Total Recovered",
										"value": "" + numberWithCommas(body.Global.TotalRecovered)
									},
									{
										"name": "Recovered Today",
										"value": "" + numberWithCommas(body.Global.NewRecovered),
										"inline": true
									}
								],
								footer: foot
							};

							message.channel.send("Serving Data Sir.", {embed: covidEmbed});
						}else {
							var input = args[1].toLowerCase();
							var covid = body.Countries.filter(function (item) {
								return item.Slug == input;
							});
							if (covid[0] != null) {
								var imageURL = "https://www.countryflags.io/" + covid[0].CountryCode + "/flat/64.png";
								var foot = {
									text: 'Source : https://covid19api.com/#details',
									icon_url: 'https://covid19api.com/logo-color-sm.png'

								};
								var covidEmbed = {
									title: "Stats for " + covid[0].Country,
									color: 0x00AE86,
									image: {
										url: imageURL,

										width: 80
									},
									fields: [
										{
											"name": "Total Cases",
											"value": "" + numberWithCommas(covid[0].TotalConfirmed),
											"inline": true
										},
										{
											"name": "Total Deaths",
											"value": "" + numberWithCommas(covid[0].TotalDeaths),
											"inline": true
										},
										{
											"name": "Confirmed Cases Today",
											"value": "" + numberWithCommas(covid[0].NewConfirmed)

										},
										{
											"name": "Confirmed Deaths Today",
											"value": "" + numberWithCommas(covid[0].NewDeaths),
											"inline": true
										},
										{
											"name": "Total Recovered",
											"value": "" + numberWithCommas(covid[0].TotalRecovered)
										},
										{
											"name": "Recovered Today",
											"value": "" + numberWithCommas(covid[0].NewRecovered),
											"inline": true
										}
									],
									footer: foot
								};

								message.channel.send("Serving Data Sir.", {embed: covidEmbed});
							}
						}
						} else {
							message.channel.send(":warning: Please select a country or global :warning:");
						}
					}else {
					message.channel.send(":warning: Please select a country or global :warning:");
				}


			}else{
					message.channel.send(":warning: API for data not responding.  Please Contact @Milkbag2761 :warning: ");
				}

		});
    }
}