var Discord = require('discord.io');
var Discord1 = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var weather = require('weather-js');
var fs = require('fs');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});

bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
	// Our bot needs to know if it will execute a command
	// It will listen for messages that will start with `!`

	if (message.substring(0, 1) == '>') {
		var args = message.substring(1).split(' ');
		var cmd = args[0];

		switch(cmd) {
			// !ping
			case 'play':
				bot.joinVoiceChannel("691692889247580185", function(error, events) {
					var url = args[1];
					if (error) return console.error(error);

					//Then get the audio context
					bot.getAudioContext("691692889247580185", function(error, stream) {
						//Once again, check to see if any errors exist
						if (error) return console.error(error);

						//Create a stream to your file and pipe it to the stream
						//Without {end: false}, it would close up the stream, so make sure to include that.
						fs.createReadStream("des.mp3").pipe(stream, {end: false});

						//The stream fires `done` when it's got nothing else to send to Discord.
						stream.on('done', function() {
							//Handle
						});
					});
				});
				break;

			case 'help':

				bot.sendMessage({
					to: channelID,
					message: "**Look below for a list of commands**",
					embed: {
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
									"name": "Weather",
									"value": ">weather [name of location]"
								},
								{
									"name": "Rock-Paper-Scissors",
									"value": ">rps [rock, paper, scissors]"
								},
								{
									"name": "Any # Dice Roll",
									"value": ">diceroll [number of sides]"
								},
								{
									"name": "Random response",
									"value": ">ay"
								}
							]
						}
					});
				break;
			case 'weather' :
				weather.find({search: args.join(" "), degreeType : 'C'}, function(err,result){

					if(err) {
						bot.sendMessage({
							to: channelID,
							message: err
						});
					}else if(result.length == 0){

							bot.sendMessage({
								to: channelID,
								message: "** Please enter a valid location **"
							});
							return;
					}
					var current = result[0].current;
					var location = result[0].location;
					bot.sendMessage({
						to: channelID,
						message: '', // You can also send a message with the embed.
						embed: {
							color: 6826080,
							footer: {
								text: ''
							},
							thumbnail:
								{
									url: current.imageUrl
								},
							title: 'Weather in '+current.observationpoint,
							url: '',
							"fields": [
								{
									"name": "Timezone",
									"value": "UTC"+location.timezone,
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
									"value": current.humidity+"%",
									"inline": true
								}
							]
						}
					});

				});
				break;

			case 'ay':
				bot.sendMessage({
					to: channelID,
					message: 'The fuck you want <@'+userID+'>'
				});
				break;
			case 'diceroll':
				var max = args[1];
				var rand = Math.floor(Math.random() * (max - 1) ) + 1;
				bot.sendMessage({
					to: channelID,
					message: '``'+rand+'``'
				});
				break;
			case 'rps' :
				/*
					1 - Rock
					2 - Paper
					3 - Scissors
				*/
				var move = args[1].toLowerCase();
				var rand = Math.floor(Math.random() * (4 - 1) ) + 1;
				var message = "";
				//rock
				if(rand == 1){
					if(move == "rock"){
						message = "``SimpBot chose Rock `` \n`` YOU TIED ``";
					}
					else if(move == "paper"){
						message = "``SimpBot chose Rock `` \n`` YOU WON ``";
					}
					else if(move == "scissors"){
						message = "``SimpBot chose Rock `` \n`` YOU LOST ``";
					}
				}
				//paper
				else if(rand == 2){

					if(move == "rock"){
						message = "``SimpBot chose Paper `` \n`` YOU LOST ``";
					}
					else if(move == "paper"){
						message = "``SimpBot chose Paper `` \n`` YOU TIED ``";
					}
					else if(move == "scissors"){
						message = "``SimpBot chose Paper `` \n`` YOU WON ``";
					}

				}
				//scissors
				else if(rand == 3){

					if(move == "rock"){
						message = "``SimpBot chose Scissors `` \n`` YOU WON ``";
					}
					else if(move == "paper"){
						message = "``SimpBot chose Scissors `` \n`` YOU LOST ``";
					}
					else if(move == "scissors"){
						message = "``SimpBot chose Scissors `` \n`` YOU TIED ``";
					}

				}
				bot.sendMessage({
					to: channelID,
					message: message
				});
				break;
			// Just add any case commands if you want to..
		}
	}



});