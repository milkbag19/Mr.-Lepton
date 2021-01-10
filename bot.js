
/* Imports for the main file */

/********************************************///
var Discord1 = require('discord.js');		 ///
var logger = require('winston');			 ///
var commands = require('./src/commands.js')	 ///
var mysql = require('mysql');				 ///
var constants = require("./constant")		 ///
var con = mysql.createConnection({			 ///
	host: constants.HOST,					 ///
	user: constants.USERNAME,				 ///
	database: constants.DATABASE,			 ///
	password: constants.PASSWORD			 ///
});											 ///
const { Player } = require("discord-player");///
const { isNullOrUndefined } = require('util');
let timeoutID;
/********************************************///

/* Important config settings */

/*****************************************************************************///
//Discord API logon and init												  ///
var client = new Discord1.Client();											  ///
client.login("");  ///
const player = new Player(client);

process.on("unhandledRejection", console.error);
var foot = {
				text: 'Github : https://github.com/milkbag19/Mr.-Lepton',
				icon_url: 'https://i.imgur.com/XyikPAg.jpg'

};
client.on('ready', () => {
	console.log('Bot: Hosting ' + `${client.users.size}` + ' users, in ' + `${client.channels.size}` + ' channels of ' + `${client.guilds.size}` + ' guilds.');
    client.user.setStatus('online')
    client.user.setActivity('>help', { type: 'PLAYING' });
});
client.player = player;
//SQL Database connection and renewal										  ///
client.player.on('trackStart', (message, track) =>
	message.channel.send(":musical_note: **Now playing : **  ``"+track.title+"!``",
		{
			embed:
			{
				title: track.title,
				url: track.url,
				image: {
							url: track.thumbnail,
							width: 360,
							height: 202
				},
				fields: [
					{
						name: "Duration : ",
						value: track.duration,
						"inline": true
					},
					{
						name: "Requested By : ",
						value : track.requestedBy
					}
				]
			}
		})
)
	.on('trackAdd', (message, queue, track) => message.channel.send(`**${track.title}** has been added to the queue!`))
	.on('error', (error, message) => {
    switch(error){
        case 'NotPlaying':
            message.channel.send('There is no music being played on this server!')
            break;
        case 'NotConnected':
            message.channel.send('You are not connected in any voice channel!')
            break;
        case 'UnableToJoin':
            message.channel.send('I am not able to join your voice channel, please check my permissions!')
            break;
        case 'LiveVideo':
            message.channel.send('YouTube lives are not supported!')
            break;
        default:
            message.channel.send(`Something went wrong... Error: ${error}`)
    }
	})
	.on('channelEmpty', (message, queue) => {
		timeoutID = setTimeout(() => {
  		// This will run if the timeout reaches its end
  		// You can adapt the code above to disconnect from the voice channel
		}, 15 * 60 * 1000)
		message.channel.send('Music stopped as there is no more member in the voice channel!')

	})
	.on('noResults', (message, query) => {message.channel.send(`No results found on YouTube for ${query}!`)})
	.on('queueEnd', (message, queue) => {
		timeoutID = setTimeout(() => {
  		// This will run if the timeout reaches its end
  		// You can adapt the code above to disconnect from the voice channel
		}, 15 * 60 * 1000)
		message.channel.send('Music stopped as there is no more music in the queue!')
	})


con.connect(function(err) {													  ///
	if (err) throw err;														  ///
	console.log("Connected to Database!");									  ///
}); 																		  ///
setInterval(function () {													  ///
	con.query('SELECT 1');													  ///
}, 5000);																	  ///
// Configure logger settings												  ///
logger.remove(logger.transports.Console);									  ///
logger.add(new logger.transports.Console, {									  ///
	colorize: true															  ///
});																			  ///
logger.level = 'debug';														  ///
/*****************************************************************************///

/* Main bot listener */
client.on("message", async (message) => {
	
	if (message.guild !== null) {
		serverID = message.guild.id
		con.query("SELECT * FROM `servers` WHERE `server_id` = \'" + serverID + "\'", function (err, result2) {
			if (result2.length == 0) {
				con.query("INSERT INTO `servers` (`server_id` ,`join_date`) VALUES (\'" + serverID + "\' , \'" + Date.now() + "\')", function (err, result2) {

				});
			}
		});
	}
	if (message.author.id != "708157232667295754" && message.author.id != "469739358535155712") {
		// Our bot needs to know if it will execute a command
		// It will listen for messages that will start with `!`

		var sqls = "SELECT * FROM `bot_users` WHERE `user_id` = \'" + message.author.id + "\'";
		con.query(sqls, function (err, result2) {
			if (result2[0] == null) {
				var sql = "INSERT INTO `bot_users`(`user_id`, `balance`, `exp`) VALUES (\'" + message.author.id + "\',\'100\', \'0\')";
				con.query(sql, function (err, result) {
					if (err) throw err;
					console.log("new user detected and registered");
				});

			}
		});
	}
	var nuts_check = message.content.substring(0).split(' ');
	var nuts_check_word = nuts_check.join(" ");
	nuts_check_word = nuts_check_word.toLowerCase();
	console.log(nuts_check_word);
	if (nuts_check_word.includes("deez") && nuts_check_word.includes("nuts")) {
		message.channel.send("GOTTEM");
	}

	var args = message.content.split(' ');
	if (args[0] == ">mtg") {
		commands.mtg(message, args)
	}
	else if (args[0] == ">diceroll") {
		commands.diceroll(message,args)
	}
	else if (args[0] == ">bal" || args[0] == ">balance") {
		commands.balance(message, con)
	}
	else if (args[0] == ">pr" || args[0] == ">prof" || args[0] == ">profile") {
		commands.profile(message, con)
	}
	else if (args[0] == ">weather") {
		commands.weather(message, args)
	}
	else if (args[0] == ">help") {
		commands.help(message)
	}
	else if (args[0] == ">poke") {
		commands.poke(message,args)
	}
	else if (args[0] == ">covid") {
		commands.covid(message, args)
    }
	else if(args[0] == ">search") {
		commands.image_search(message, args)
	} 
	else if (args[0] == ">work") {
		commands.work(message, con)
	}
	else if (args[0] == ">database") {
		commands.query(message, con)
	}
	else if (args[0] == ">goodnews" || args[0] == ">gn" || args[0] == ">happy") {
		commands.goodnews(message)
	}
	else if (args[0] == ">gamble") {
		commands.gamble(message, args, con)
	} 
	else if (args[0] == ">rps") {
		commands.rps(message, args)
	}
	else if (args[0] == ">trade"||args[0] == ">give"||args[0] == ">pay") {
		commands.pay(message, args, con)
			
	}
	else if (args[0] == ">addbal") {
		commands.addbal(message, args, con)
	}
	else if (args[0] == ">play") {
		
		if (!message.guild) {
			message.channel.send("Please use this command within a server!")
		}
		const guild = client.guilds.cache.get(message.guild.id);
		const channel = guild.channels.cache.get(message.member.voice.channelID);
		if (!channel) return console.error("The channel does not exist!");
    	channel.join().then(connection => {
        	// Yay, it worked!
			console.log("Successfully connected.");
			message.channel.send("Playing in voice channel ``"+channel.name+"``")
    	}).catch(e => {

        	console.error(e);
		});
		args.shift()
		request = args.join(" ")
		await client.player.play(message, request, message.member.user.tag)
		clearTimeout(timeoutID)
		timeoutID = undefined
	}
	else if (args[0] == ">skip") {
		client.player.skip(message) 
		message.channel.send(":fast_forward: **Skipped** ``The current song has been skipped!``");
	} 
	else if (args[0] == ">stop") {
		client.player.stop(message)
		message.channel.send(":octagonal_sign: **Stopped** ``The queue has been cleared and Mr. Lepton has left the channel!``");
	}
	else if (args[0] == ">pause") {
		client.player.pause(message)
		message.channel.send(":pause_button: **Paused** ``The current song has been paused!``");
	}
	else if (args[0] == ">resume") {
		client.player.resume(message)
		message.channel.send(":arrow_forward: **Resumed** ``The current song has been resumed!``");
	}
	else if (args[0] == ">back") {
		client.player.back(message)
		message.channel.send(":rewind: **Rewinded** ``The queue has been rewinded!``");
	}
	else if (args[0] == ">loop") {
		if (args[1] == "all") {
			client.player.setLoopMode(message, true) 
			message.channel.send(":arrows_clockwise: **Queue Loop Started** ``The current queue will be looed!``");
		} else if (args[1] == "single") {
			client.player.setRepeatMode(message, true) 
			message.channel.send(":arrows_clockwise: **Song Loop Started** ``The song currently playing will be looped!``");
		} else if (args[1] == "off") {
			client.player.setRepeatMode(message, false) 
			client.player.setLoopMode(message, false) 
			message.channel.send(":octagonal_sign: **Loop Ended** ``Looping disabled!``");
		} else{
			message.channel.send("``>loop all|single|off \n#Use these commands to enable/disable looping.``");
		}
	} else if (args[0] == ">queue") {
		message.channel.send(":notes: **The current queue :** ");
		queue = client.player.getQueue(message).tracks
		i = 1
		queue.forEach(function (track) {
			message.channel.send("``[#" + i + "]`` **▶ " + track.title + "** requested by **" + client.users.cache.get(""+track.requestedBy+"").tag + "** ``[" + track.duration + "]``\n");
			i++
		})
		
	}
	else if (args[0] == ">player") {
		commands.player(message)
	}
	else {
		commands.exp(message, con)
	}

});


