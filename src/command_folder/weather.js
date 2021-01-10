var weather = require('weather-js');

module.exports = {
    command: function (message, args) {
        args.shift()
		location = args.join(" ")
		weather.find({ search: location, degreeType: 'C' }, function (err, result) {

			if (err) {
				message.channel.send(
					err
				);
			} else if (result.length == 0) {
				message.channel.send(
					"**⚠ Please enter a valid location **"
				);
				return;
			}
			var current = result[0].current;
			var location = result[0].location;
			message.channel.send(
				{
					embed: {
						color: 6826080,
						footer: {
							text: ''
						},
						thumbnail:
						{
							url: current.imageUrl
						},
						title: 'Weather in ' + current.observationpoint,
						url: '',
						"fields": [
							{
								"name": "Timezone",
								"value": "UTC" + location.timezone,
								"inline": true
							},
							{
								"name": "Degree Type",
								"value": location.degreetype,
								"inline": true
							},
							{
								"name": "Temperature",
								"value": current.temperature,
								"inline": true
							},
							{
								"name": "Feels Like",
								"value": current.feelslike,
								"inline": true
							},
							{
								"name": "Winds",
								"value": current.winddisplay,
								"inline": true
							},
							{
								"name": "Humidity",
								"value": current.humidity + "%",
								"inline": true
							}
						]
					}
				}
			);

		});
    }
}