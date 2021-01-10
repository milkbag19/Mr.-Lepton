module.exports = {
    main: function (message) {
        var help_embed = {
			color: 6826080,
			footer: {
				text: ''
			},
			thumbnail:
				{
					url: "https://cdn4.iconfinder.com/data/icons/robot-flat-color-vol-1/52/automatic__robot__cute__head-512.png"
				},
			title: 'Helpful List of Commands',
			url: '',
			"fields": [
				{
					"name": ":construction_worker:Work for quick cash",
					"value": ">work",
					"inline": true
				},
				{
					"name": ":mage:Magic The Gathering Card Search",
					"value": ">mtg auto/card [card name]",
					"inline": true
				},
				{
					"name": ":desktop:Get data about Mr. Lepton",
					"value": ">database",
					"inline": true
				},
				{
					"name": ":moneybag:Give money to other users",
					"value": "(>pay - >give - >trade) @user [amount]",
					"inline": true
				},
				{
				    "name": ":happy:Random Goodnews",
					"value": ">gn - >goodnews - >happy",
					"inline": true
				},
				{
					"name": ":microscope:Covid-19 stats by country",
					"value": ">covid [country name]",
					"inline": true
				},
				{
					"name": ":mag:Images Search",
					"value": ">search [search term]",
					"inline": true
				},
				{
					"name": ":red_circle:Pokedex",
					"value": ">poke [pokemon]",
					"inline": true
				},
				{
					"name": ":white_sun_rain_cloud:Weather",
					"value": ">weather [location]",
					"inline": true
				},
				{
					"name": ":busts_in_silhouette:Display your profile",
					"value": ">prof - >pr - >profile",
					"inline": true
				},
				{
					"name": ":moneybag:Gamble a certain amount",
					"value": ">gamble [amount]",
					"inline": true
				},
				{
					"name": ":money_with_wings:Display your current balance",
					"value": ">balance",
					"inline": true
				},
				{
					"name": ":scissors:Rock-Paper-Scissors",
					"value": ">rps [rock, paper, scissors]",
					"inline": true
				},
				{
					"name": ":game_die:Any # Dice Roll",
					"value": ">diceroll [# of sides]",
					"inline": true
				},
				{
					"name": ":notes:Music Help",
					"value": ">player"
				}
            ]
		};
		message.channel.send("A list of helpful Commands", { embed: help_embed });
	},
	music: function (message) {
		var help_embed = {
			color: 6826080,
			footer: {
				text: ''
			},
			thumbnail:
				{
					url: "https://cdn4.iconfinder.com/data/icons/robot-flat-color-vol-1/52/automatic__robot__cute__head-512.png"
				},
			title: 'Helpful List of Music Commands',
			url: '',
			"fields": [
				{
					"name": ":arrow_forward:Play a song",
					"value": ">play [Song name or link]",
					"inline": true
				},
				{
					"name": ":fast_forward:SKip the current song",
					"value": ">skip",
					"inline": true
				},
				{
					"name": ":arrows_clockwise:Loop the current song or queue",
					"value": ">loop [single|all|off]",
					"inline": true
				},
				{
					"name": ":play_pause:Pause or resume the current song",
					"value": ">pause - >resume",
					"inline": true
				},
				{
				    "name": ":rewind:Rewind to the last song in the queue",
					"value": ">back",
					"inline": true
				},
				{
					"name": ":notes:Get the current queue",
					"value": ">queue",
					"inline": true
				},
            ]
		};
		message.channel.send("A list of helpful Commands", { embed: help_embed });
	}
}