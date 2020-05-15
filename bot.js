var Discord = require('discord.io');
var Discord1 = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var weather = require('weather-js');
var fs = require('fs');
var mysql = require('mysql');
var Pokedex = require('pokedex');
var pokedex = new Pokedex();
var Pokedexx = require('pokedex.js');
var pokedexx = new Pokedexx('en');
var request = require('request');
var google = require('google');
var dexEntries = require("./assets/flavorText.json");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var gis = require('g-i-s');
var client = new Discord1.Client();
client.login("NzA4MTU3MjMyNjY3Mjk1NzU0.XrzsCQ.b65fHJiuyFs1ZrqSPnYmdbBEeOk");
var dex;
var covid;

function logResults(error, results) {
	if (error) {
		console.log(error);
	}
	else {
		console.log(JSON.stringify(results, null, '  '));
	}
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

request('https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/data/pokedex.js', (err, res, body) => {
	if (!err && res.statusCode == 200) {
		dex = requireFromUrl('https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/data/pokedex.js').BattlePokedex;
	} else {
		console.log('Error fetching Showdown dex; Switching to local dex...');
		dex = require('./pokedex.js').BattlePokedex;
	}
});

function howManyHundreds(num) {
	return Math.floor(num / 100);
}

function capitalFirstLetter(string){
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

//Function for dicerolling since dice will be used in more than one place
function diceroll(max, channelID, userID){

	var rand = Math.floor(Math.random() * (max) ) + 1;

	if(rand == 1){
		url ="https://forums.androidcentral.com/attachments/software-development-hacking/260654d1495531075t-tutorial-learn-create-roll-dice-game-android-dice_1.png";
	}else if(rand == 2){
		url = "https://forums.androidcentral.com/attachments/software-development-hacking/260655d1495531092t-tutorial-learn-create-roll-dice-game-android-dice_2.png";
	}else if(rand == 3){
		url = "https://forums.androidcentral.com/attachments/software-development-hacking/260656d1495531103t-tutorial-learn-create-roll-dice-game-android-dice_3.png";
	}else if(rand == 4){
		url = "https://forums.androidcentral.com/attachments/software-development-hacking/260657d1495531116t-tutorial-learn-create-roll-dice-game-android-dice_4.png";
	}else if(rand == 5){
		url = "https://forums.androidcentral.com/attachments/software-development-hacking/260658d1495531125t-tutorial-learn-create-roll-dice-game-android-dice_5.png";
	}else if(rand == 6){
		url = "https://forums.androidcentral.com/attachments/software-development-hacking/260659d1495531134t-tutorial-learn-create-roll-dice-game-android-dice_6.png";
	}else if(rand > 6){
		url = "https://media2.giphy.com/media/3oz8xVlyQAXwnD9C2A/source.gif";
	}

	bot.sendMessage({
		to: channelID,
		message: '',
		embed : {
			color: 6826080,
			footer: {
				text: ''
			},
			thumbnail:
				{
					url: url
				},
			title: 'Dice Roll',
			url: '',
			"fields": [
				{
					"name": "You Rolled : ",
					"value": "**"+rand+"**",
					"inline": true
				}
			]
		}
	});
}


var con = mysql.createConnection({
	host: "us-cdbr-east-06.cleardb.net",
	user: "b5195b349f1749",
	database:"heroku_d95b94880f623cf",
	password: "4951f29f842278d"
});


con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to Database!");
});
setInterval(function () {
	con.query('SELECT 1');
}, 5000);

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
	bot.setPresence( {game: {name:">help"}} );
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});

				/* *************************** */
				/* ^^^^      Setup       ^^^^  */
				/* *************************** */

bot.on('disconnect', function(msg, code) {
	if (code === 0) return console.error(msg);
	bot.connect();
});
client.on("message", (message) => {
	var args = message.content.split(' ');
	var rand = Math.round(Math.random()*10);
	var url = "";


	if(args[0] == ">search") {
		if(args[1]!=""&& args[1]!=null) {
			var search = args.slice(1, args.length);
			console.log(search.join(" "));
			gis(search.join(" "), function (err, res) {
				if (err) throw err;
				while(true) {
					rand = Math.round(Math.random()*25);
					url = "";

					if (rand == 1) {url = res[0].url;}
					else if (rand == 2) {url = res[1].url;}
					else if (rand == 3) {url = res[2].url;}
					else if (rand == 4) {url = res[3].url;}
					else if (rand == 5) {url = res[4].url;}
					else if (rand == 6) {url = res[5].url;}
					else if (rand == 7) {url = res[6].url;}
					else if (rand == 8) {url = res[7].url;}
					else if (rand == 9) {url = res[8].url;}
					else if (rand == 10) {url = res[9].url;}
					else if (rand == 11) {url = res[10].url;}
					else if (rand == 12) {url = res[11].url;}
					else if (rand == 13) {url = res[12].url;}
					else if (rand == 14) {url = res[13].url;}
					else if (rand == 15) {url = res[14].url;}
					else if (rand == 16) {url = res[15].url;}
					else if (rand == 17) {url = res[16].url;}
					else if (rand == 18) {url = res[17].url;}
					else if (rand == 19) {url = res[18].url;}
					else if (rand == 20) {url = res[19].url;}
					else if (rand == 21) {url = res[20].url;}
					else if (rand == 22) {url = res[21].url;}
					else if (rand == 23) {url = res[22].url;}
					else if (rand == 24) {url = res[23].url;}
					else if (rand == 25) {url = res[24].url;}
					else {url = res[9].url;}
					if(imageExists(url)){
						break;
					}else{
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
		}else{
			message.channel.send("**Search query was empty.  Please retry.**");

		}
	}else if(args[0] == ">poke") {
		try {

			var input = args[1].toLowerCase();
			var pokeEntry = dex[input];
			if(pokeEntry){

			var evoLine = "**" + capitalFirstLetter(input) + "**",
				preEvos = "";
			if (pokeEntry.prevo) {
				preEvos = preEvos + capitalFirstLetter(pokeEntry.prevo) + " > ";
				var preEntry = dex[pokeEntry.prevo];
				if (preEntry.prevo) {
					preEvos = capitalFirstLetter(preEntry.prevo) + " > " + preEvos;
				}
				evoLine = preEvos + evoLine;
			}
			var evos = "";
			if (pokeEntry.evos) {
				evos = evos + " > " + pokeEntry.evos.map(entry => capitalFirstLetter(entry)).join(", ");
				if (pokeEntry.evos.length < 2) {
					var evoEntry = dex[pokeEntry.evos[0]];
					if (evoEntry.evos) {
						evos = evos + " > " + evoEntry.evos.map(entry => capitalFirstLetter(entry)).join(", ");
					}
				}
				evoLine = evoLine + evos;
			}

			var pokeemon = JSON.parse(pokedexx.name(capitalFirstLetter(input)).get());
			var pokemon = pokedex.pokemon(input);


			var foot = {
				text: 'Github : https://github.com/milkbag19/Mr.-Lepton',
				icon_url: 'https://i.imgur.com/XyikPAg.jpg'

			};
			var abilityString = pokeEntry.abilities[0];
			for (var i = 1; i < Object.keys(pokeEntry.abilities).length; i++) {
				if (Object.keys(pokeEntry.abilities)[i] == 'H') {
					abilityString = abilityString + ", " + pokeEntry.abilities.H + "";
				} else {
					abilityString = abilityString + ", " + pokeEntry.abilities[i];
				}
			}
			if(pokeEntry.evoLevel === undefined) {
				var evoLevel ="Legendary";
			}
			var pokedexEntry = dexEntries[pokeEntry.num] ? dexEntries[pokeEntry.num].filter((c) => {
				return c.langID == '9';
			})[0].flavourText : 'No data found.';
			console.log(input);
			var imgPoke = input.toLowerCase();
			imageURL = 'https://play.pokemonshowdown.com/sprites/xyani/' + imgPoke.replace(" ", "") + ".gif"
			var dexEmbed = {
				color: 0x00AE86,
				image: {
					url: imageURL,

					width: 80
				},
				fields: [
					{
						"name": "Type",
						"value": pokeEntry.types.join(", "),
						"inline": true

					},
					{
						"name": "Evolution Level",
						"value": pokeEntry.evoLevel,
						"inline": true
					},
					{
						"name": "Abilities",
						"value": abilityString


					},
					{
						"name": "Base Stats",
						"value": "HP : **" + pokeEntry.baseStats.hp + "**\nAtk : **" + pokeEntry.baseStats.atk + "**\nDef : **" + pokeEntry.baseStats.def + "**",
						"inline": true
					},
					{
						"name": "---------",
						"value": "Sp. Atk : **" + pokeEntry.baseStats.spa + "**\nSp. Def : **" + pokeEntry.baseStats.spd + "**\nSpeed: **" + pokeEntry.baseStats.spe + "**",
						"inline": true
					},
					{
						"name": "Physical Attributes",
						"value": "Height : **" + pokeEntry.heightm + "m" + "**" + "\nWeight : **" + pokeEntry.weightkg + "kg" + "**",
						"inline": true
					},
					{
						"name": "Egg Groups",
						"value": pokeEntry.eggGroups.join(", "),
						"inline": true

					},
					{
						"name": "Pokdex Entry",
						"value": pokedexEntry

					},
					{
						"name": "Evolution",
						"value": evoLine

					}
				],

				footer: foot
			};


			message.channel.send("\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\n\n**" + capitalFirstLetter(pokeEntry.species) + "**\n\n\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\n\n", {
				embed: dexEmbed
			}).catch(console.error);
		}else{

				message.channel.send("⚠ Pokemon not found in database!\n\n! NOTE - Gen 8 Pokemon have not been added to the database !").catch(console.error);
			}
		}catch(error){console.error(error);}
		}else if(args[0] == ">covid"){
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




});
				/* *************************** */
				/* V  Main message listener V  */
				/* *************************** */

bot.on('message', function (user, userID, channelID, messages, evt) {


	if (userID != "708157232667295754" && userID != "469739358535155712"){
		// Our bot needs to know if it will execute a command
		// It will listen for messages that will start with `!`

		var sqls = "SELECT * FROM `bot_users` WHERE `user_id` = \'" + userID + "\'";
	con.query(sqls, function (err, result2) {
		if (result2[0] == null) {
			var sql = "INSERT INTO `bot_users`(`user_id`, `balance`, `exp`) VALUES (\'" + userID + "\',\'100\', \'0\')";
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log("new user detected and registered");
			});

		}
	});


	if (messages.substring(0, 1) == '>') {
		var args = messages.substring(1).split(' ');
		var cmd = args[0];

		switch (cmd) {


			case "addbal":
				var addedCoin = args[1];
				con.query("UPDATE `bot_users` SET `balance` = \'" + addedCoin + "\' WHERE `user_id` = \'" + userID + "\'", function (err, result) {
				});
				break;
			case "pr":
			case "prof":
			case "profile":
				var sqls = "SELECT * FROM `bot_users` WHERE `user_id` = \'" + userID + "\'";
				con.query(sqls, function (err, result2) {

					var rand2 = Math.round(Math.random() * 25);
					var exp = parseInt(result2[0].exp) + rand2;
					var reqExp = 100;
					var level = 1;
					for (var i = 0; ; i++) {
						reqExp = (reqExp) + (100 * (1.15 * i));
						if (result2[0].exp < reqExp && exp > reqExp) {
							var level = i;
							break;
						} else if (exp < reqExp) {
							var level = i;
							break;
						} else {
						}
						console.log(result2[0].exp);
					}
					bot.sendMessage({
						to: channelID,
						message: "<@" + userID + ">",
						embed: {
							color: 6826080,
							color: 6826080,
							footer: {
								text: ''
							},
							thumbnail:
								{
									url: "https://i.kym-cdn.com/entries/icons/original/000/028/315/cover.jpg"
								},
							title: 'Your Profile',
							url: '',
							"fields": [
								{
									"name": "Balance",
									"value": result2[0].balance
								},
								{
									"name": "EXP",
									"value": result2[0].exp + " / " + reqExp
								},
								{
									"name": "Level",
									"value": level
								}
							]
						}
					});


				});
				break;
			case "gamble":
				if (!isNaN(args[1])) {
					//console.log(isNaN(args[1]));
					//console.log(args[1]);
					var bet = parseFloat(args[1]);
					//console.log(bet*2.345);
					var sql = "SELECT `balance` FROM `bot_users` WHERE `user_id` = \'" + userID + "\' ";
					var currentBalance;
					con.query(sql, function (err, result) {
						if (err) throw err;
						var currentBalance = parseFloat(result[0].balance);
						if (currentBalance < bet) {
							bot.sendMessage({
								to: channelID,
								message: "<@" + userID + ">",
								embed: {
									color: 6826080,
									footer: {
										text: ''
									},
									thumbnail:
										{
											url: "https://i.kym-cdn.com/entries/icons/original/000/028/315/cover.jpg"
										},
									title: ':warning: You do not have enough funds!',
									url: '',
									"fields": [
										{
											"name": "Balance",
											"value": currentBalance
										},
										{
											"name": "Bet",
											"value": bet
										}
									]
								}
							});
							return;
						}
						var change = Math.random() * 2;
						bet = (bet * change) - bet;
						if (bet > parseFloat(args[1])) {
							bet = parseFloat(args[1]);

						}
						var outcome = Math.round(currentBalance - bet);

						console.log(bet);
						console.log(change);
						console.log(outcome);
						rand2 = Math.round(Math.random() * 25);
						var sqls = "SELECT `exp` FROM `bot_users` WHERE `user_id` = \'" + userID + "\'";
						con.query(sqls, function (err, result2) {
							var winLose = "";
							var endAmount = bet;
							if (bet > 0) {
								winLose = "LOST :face_with_symbols_over_mouth: ";
							} else if (bet < 0) {
								bet = bet * -1;
								winLose = "WON :money_mouth: ";
							} else {
								bot.sendMessage({
									to: channelID,
									message: "<@" + userID + ">",
									embed: {
										color: 6826080,
										footer: {
											text: ''
										},
										thumbnail:
											{
												url: "https://i.kym-cdn.com/entries/icons/original/000/028/315/cover.jpg"
											},
										title: '⚠ Please enter a valid amount!',
										url: '',
										"fields": [
											{
												"name": "Input",
												"value": args[1]
											}
										]
									}
								});


								return;
							}
							var exp = parseInt(result2[0].exp) + rand2;
							var reqExp = 100;
							for (var i = 0; ; i++) {
								var reqExp = (reqExp) + (100 * (1.15 * i));
								if (result2[0].exp < reqExp && exp > reqExp) {
									var get_current_coin = "SELECT `balance` FROM `bot_users` WHERE `user_id` = " + userID + " ";
									var bal;
									con.query(get_current_coin, function (err, resultr) {
										if (err) throw err;
										bal = parseFloat(resultr[0].balance);
										console.log(resultr[0].balance)

										var addedCoin = Math.round((10.0 * (exp / 1000.0)) + bal);
										console.log(addedCoin);
										console.log(bal);
										var addCoinSql = "UPDATE `bot_users` SET `balance` = \'" + addedCoin + "\' WHERE `user_id` = \'" + userID + "\' ";
										con.query(addCoinSql, function (err, results) {
											if (err) throw err;
											console.log("added Coin");
										});
										bot.sendMessage({
											to: channelID,
											message: "<@" + userID + ">",
											embed: {
												color: 6826080,
												footer: {
													text: ''
												},
												thumbnail:
													{
														url: "https://i.pinimg.com/originals/92/a4/ac/92a4acc3099fdccb91e6c3447c2ed12f.gif"
													},
												title: ':arrow_up: You Leveled up!',
												url: '',
												"fields": [
													{
														"name": "You are now level",
														"value": i + 1
													},
													{
														"name": "You earned :",
														"value": Math.round(addedCoin - bal) + " Coins!"
													}
												]
											}
										});
									});
									break;
								} else if (exp < reqExp) {
									break;
								} else {
								}

							}
							var sql2 = "UPDATE `bot_users` SET `exp`=\'" + exp + "\', `balance` = \'" + outcome + "\' WHERE user_id = \'" + userID + "\'";
							con.query(sql2, function (err, result) {
								if (err) throw err;

							});
							console.log(outcome);
							console.log(result);
							console.log(bet);

							bot.sendMessage({
								to: channelID,
								message: "<@" + userID + ">",
								embed: {
									color: 6826080,
									footer: {
										text: ''
									},
									thumbnail:
										{
											url: "https://media2.giphy.com/media/26uflBhaGt5lQsaCA/200.gif"
										},
									title: 'You ' + winLose + " " + Math.round(bet) + " Coins!",
									url: '',
									"fields": [
										{
											"name": "New Balance",
											"value": Math.round(outcome)
										},
										{
											"name": "Bet",
											"value": args[1],
											"inline": true
										},
										{
											"name": "End Amount",
											"value": Math.round(parseFloat(args[1]) - endAmount),
											"inline": true
										},
										{
											"name": "Exp Gained",
											"value": result2[0].exp + "(+" + rand2 + ")",
											"inline": true
										}

									]
								}
							});

						});
					});
				} else {
					if (!args[1] == "" || !args[1] == null) {
						bot.sendMessage({
							to: channelID,
							message: "<@" + userID + ">",
							embed: {
								color: 6826080,
								footer: {
									text: ''
								},
								thumbnail:
									{
										url: "https://i.kym-cdn.com/entries/icons/original/000/028/315/cover.jpg"
									},
								title: ' **⚠ Please enter a valid amount!**',
								url: '',
								"fields": [
									{
										"name": "Input",
										"value": args[1]
									}
								]
							}
						});

					} else {
						bot.sendMessage({
							to: channelID,
							message: "**⚠ Retype as >gamble [amount]**",

						});
					}
				}

				break;

			case 'bal':
			case "balance":
				var sql = "SELECT `balance` FROM `bot_users` WHERE `user_id` = " + userID + " ";
				con.query(sql, function (err, result) {
					if (err) throw err;

					bot.sendMessage({
						to: channelID,
						message: "<@" + userID + ">",
						embed: {
							color: 6826080,
							footer: {
								text: ''
							},
							thumbnail:
								{
									url: "https://i.pinimg.com/originals/92/a4/ac/92a4acc3099fdccb91e6c3447c2ed12f.gif"
								},
							title: 'You currently have a balance of : ',
							url: '',
							"fields": [
								{
									"name": "Balance",
									"value": result[0].balance
								}
							]
						}
					});

				});
				break;
			case 'tableflip':
			case 'tf':
				bot.sendMessage({
					to: channelID,
					message: "(╯°□°）╯︵ ┻━┻"
				});
				break;
			case 'unflip':
			case 'uf':
				bot.sendMessage({
					to: channelID,
					message: "┬─┬ ノ( ゜-゜ノ)"
				});
				break;
			case 'play':
				file = "des.mp3";
				bot.joinVoiceChannel("708236782814232586", function(error, events) {
					//Check to see if any errors happen while joining.
					if (error) return console.error(error);

					//Then get the audio context
					bot.getAudioContext("708236782814232586", function(error, stream) {
						//Once again, check to see if any errors exist
						if (error) return console.error(error);

						//Create a stream to your file and pipe it to the stream
						//Without {end: false}, it would close up the stream, so make sure to include that.
						fs.createReadStream('./des.mp3').pipe(stream, {end: false});

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
								"name": ":outbox_tray:Tableflip",
								"value": ">tableflip - >tf",
								"inline": true
							},
							{
								"name": ":inbox_tray:Unflip the table",
								"value": ">unflip - >uf",
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
								"name": ":speech_left:Random response",
								"value": ">ay",
								"inline": true
							}
						]
					}
				});
				break;
			case 'weather' :
				weather.find({search: args.join(" "), degreeType: 'C'}, function (err, result) {

					if (err) {
						bot.sendMessage({
							to: channelID,
							message: err
						});
					} else if (result.length == 0) {

						bot.sendMessage({
							to: channelID,
							message: "**⚠ Please enter a valid location **"
						});
						return;
					}
					var current = result[0].current;
					var location = result[0].location;
					bot.sendMessage({
						to: channelID,
						message: '<@' + userID + '>', // You can also send a message with the embed.
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
					});

				});
				break;

			case 'ay':
				bot.sendMessage({
					to: channelID,
					message: 'The fuck you want <@' + userID + '>'
				});
				break;
			case 'diceroll':
				var max = args[1];
				diceroll(max, channelID, userID);
				break;
			case 'rps' :
				/*
					1 - Rock
					2 - Paper
					3 - Scissors
				*/
				if (args[1]!=""&&args[1]!=null){
					var move = args[1].toLowerCase();
				var rand = Math.floor(Math.random() * (4 - 1)) + 1;
				var message = "";
				//rock
				if (rand == 1) {
					if (move == "rock") {
						message = "``SimpBot chose Rock `` \n`` YOU TIED ``";
					} else if (move == "paper") {
						message = "``SimpBot chose Rock `` \n`` YOU WON ``";
					} else if (move == "scissors") {
						message = "``SimpBot chose Rock `` \n`` YOU LOST ``";
					}
				}
				//paper
				else if (rand == 2) {

					if (move == "rock") {
						message = "``SimpBot chose Paper `` \n`` YOU LOST ``";
					} else if (move == "paper") {
						message = "``SimpBot chose Paper `` \n`` YOU TIED ``";
					} else if (move == "scissors") {
						message = "``SimpBot chose Paper `` \n`` YOU WON ``";
					}

				}
				//scissors
				else if (rand == 3) {

					if (move == "rock") {
						message = "``SimpBot chose Scissors `` \n`` YOU WON ``";
					} else if (move == "paper") {
						message = "``SimpBot chose Scissors `` \n`` YOU LOST ``";
					} else if (move == "scissors") {
						message = "``SimpBot chose Scissors `` \n`` YOU TIED ``";
					}

				}
				bot.sendMessage({
					to: channelID,
					message: message
				});
		}else{

				}
				break;
			// Just add any case commands if you want to..
		}
	} else {
		var sqls = "SELECT `exp` FROM `bot_users` WHERE `user_id` = \'" + userID + "\'";
		con.query(sqls, function (err, result2) {
			if (result2[0] != null) {
				rand2 = Math.round(Math.random() * 10);
				var exp = parseInt(result2[0].exp) + rand2;
				console.log(howManyHundreds(parseInt(result2[0].exp)));
				console.log(howManyHundreds(exp));
				var exp = parseInt(result2[0].exp) + rand2;
				var reqExp = 100;
				for (var i = 0; ; i++) {
					reqExp = (reqExp) + (100 * (1.15 * i));
					if (result2[0].exp < reqExp && exp > reqExp) {
						var get_current_coin = "SELECT `balance` FROM `bot_users` WHERE `user_id` = " + userID + " ";
						var bal;
						con.query(get_current_coin, function (err, resultr) {
							if (err) throw err;
							bal = parseFloat(resultr[0].balance);
							console.log(resultr[0].balance)

							var addedCoin = Math.round((10.0 * (exp / 1000.0)) + bal);
							console.log(addedCoin);
							console.log(bal);
							var addCoinSql = "UPDATE `bot_users` SET `balance` = \'" + addedCoin + "\' WHERE `user_id` = \'" + userID + "\' ";
							con.query(addCoinSql, function (err, results) {
								if (err) throw err;
								console.log("added Coin");
							});
							bot.sendMessage({
								to: channelID,
								message: "<@" + userID + ">",
								embed: {
									color: 6826080,
									footer: {
										text: ''
									},
									thumbnail:
										{
											url: "https://i.pinimg.com/originals/92/a4/ac/92a4acc3099fdccb91e6c3447c2ed12f.gif"
										},
									title: 'You Leveled up!',
									url: '',
									"fields": [
										{
											"name": "You are now level",
											"value": i + 1
										},
										{
											"name": "You earned :",
											"value": Math.round(addedCoin - bal) + " Coins!"
										}
									]
								}
							});
						});
						break;
					} else if (exp < reqExp) {
						break;
					} else {
					}

				}
				var sql2 = "UPDATE `bot_users` SET `exp`=\'" + exp + "\' WHERE user_id = \'" + userID + "\'";
				con.query(sql2, function (err, result) {
					if (err) throw err;

				});


			}
		});
	}
}
});

