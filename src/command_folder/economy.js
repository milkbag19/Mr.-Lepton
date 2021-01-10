 
var activites = ["go for a walk", "walk your neighbours dog", "attend you 9-5 deadend job", "mow a lawn", "set up a lemonade stand"];
module.exports = {
    work: function (message, con) {
        var now = Date.now();
		con.query("SELECT * FROM work WHERE `user_id` = \'"+message.author.id+"\'", function (err, result2) {
			if(result2.length > 0) {
				var last_work = result2[0].last_work;
				var work_dif = parseInt((parseInt(now) - parseInt(last_work)) / 60000);
				if (work_dif >= 20) {
					var coin = Math.round(Math.random() * 30)+10;
					con.query("SELECT * FROM bot_users WHERE `user_id` = \'"+message.author.id+"\'", function (err, result2) {
						var current_bal = result2[0].balance;
						var new_bal = parseInt(current_bal) + parseInt(coin);
						con.query("UPDATE `bot_users` SET `balance` = \'" + new_bal + "\' WHERE `user_id` = \'" + message.author.id + "\'", function (err, result) {
						});
						con.query("UPDATE `work` SET `last_work` = " + Date.now() + " WHERE `user_id` = \'" + message.author.id + "\'", function (err, result) {
						});
						message.channel.send(
							"<@" + message.author.id + ">",
							{		
							embed: {
								color: 0xFF0000,
								footer: {
									text: ''
								},
								title: "Work",
								fields:[
									{
										"name": "You "+activites[Math.round(Math.random() * activites.length)],
										"value": "You Earned "+coin,
										"inline": true
									}
								]
							}
						});
					});
				} else {
					message.channel.send(
						"<@" + message.author.id + ">",
						{
						embed: {
							color: 0xFF0000,
							footer: {
								text: ''
							},
							title: "Work Timout",
							fields: [
								{
									"name": "You must wait 20 minues before working again!",
									"value": "Time left : " + (20 - (parseInt(work_dif))) +" Minutes"
								}
							]
						}
					});
				}
			}else{

				con.query("SELECT * FROM bot_users WHERE `user_id` = \'"+message.author.id+"\'", function (err, result2) {
					var coin = Math.round(Math.random() * 30)+10;
					var current_bal = result2[0].balance;
					var new_bal = parseInt(current_bal) + parseInt(coin);
					console.log(current_bal);
					console.log(new_bal);
					console.log(coin);
					con.query("UPDATE `bot_users` SET `balance` = \'" + new_bal + "\' WHERE `user_id` = \'" + message.author.id + "\'", function (err, result) {
					});
					con.query("INSERT INTO `work` (`user_id`, `last_work`) VALUES (\'"+message.author.id+"\', "+Date.now()+")", function (err, result2) {
					});
					message.channel.send(
						"<@" + message.author.id + ">",
						{
						embed: {
							color: 0xFF0000,
							footer: {
								text: ''
							},
							title: "Work",
							fields:[
								{
									"name": "You "+activites[Math.round(Math.random() * activites.length)],
									"value": "You Earned "+coin,
									"inline": true
								}
							]
						}
					});
				});
			}
		});
    },
    balance: function (message, con) {
        var sql = "SELECT `balance` FROM `bot_users` WHERE `user_id` = " + message.author.id + " ";
        con.query(sql, function (err, result) {
            if (err) throw err;
            message.channel.send(
                "<@" + message.author.id + ">",
                {
                    embed:
                    {
                        color: 6826080,
                        footer:
                        {
                            text: ''
                        },
                        thumbnail:
                        {
                            url: "https://i.pinimg.com/originals/92/a4/ac/92a4acc3099fdccb91e6c3447c2ed12f.gif"
                        },
                        title: 'You currently have a balance of : ',
                        url: '',
                        "fields":
                        [
                            {
                                "name": "Balance",
                                "value": result[0].balance
                            }
                        ]
                    }
                }
            );
        });
    },
    gamble: function (message, args, con) {
        if (!isNaN(args[1]) && parseInt(args[1])>0) {
					//console.log(isNaN(args[1]));
					//console.log(args[1]);
					var bet = parseFloat(args[1]);
					//console.log(bet*2.345);
					var sql = "SELECT `balance` FROM `bot_users` WHERE `user_id` = \'" + message.author.id + "\' ";
					var currentBalance;
					con.query(sql, function (err, result) {
						if (err) throw err;
						var currentBalance = parseFloat(result[0].balance);
						if (currentBalance < bet) {
							message.channel.send("<@" + message.author.id + ">",{
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
						var sqls = "SELECT `exp` FROM `bot_users` WHERE `user_id` = \'" + message.author.id + "\'";
						con.query(sqls, function (err, result2) {
							var winLose = "";
							var endAmount = bet;
							if (bet > 0) {
								winLose = "LOST :face_with_symbols_over_mouth: ";
							} else if (bet < 0) {
								bet = bet * -1;
								winLose = "WON :money_mouth: ";
							} else {
								message.channel.send(
									"<@" + message.author.id + ">",
									{
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
									var get_current_coin = "SELECT `balance` FROM `bot_users` WHERE `user_id` = " + message.author.id + " ";
									var bal;
									con.query(get_current_coin, function (err, resultr) {
										if (err) throw err;
										bal = parseFloat(resultr[0].balance);
										console.log(resultr[0].balance)

										var addedCoin = Math.round((10.0 * (exp / 1000.0)) + bal);
										console.log(addedCoin);
										console.log(bal);
										var addCoinSql = "UPDATE `bot_users` SET `balance` = \'" + addedCoin + "\' WHERE `user_id` = \'" + message.author.id + "\' ";
										con.query(addCoinSql, function (err, results) {
											if (err) throw err;
											console.log("added Coin");
										});
										message.channel.send(
											"<@" + message.author.id + ">",
											{
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
							var sql2 = "UPDATE `bot_users` SET `exp`=\'" + exp + "\', `balance` = \'" + outcome + "\' WHERE user_id = \'" + message.author.id + "\'";
							con.query(sql2, function (err, result) {
								if (err) throw err;

							});
							console.log(outcome);
							console.log(result);
							console.log(bet);

							message.channel.send(
								"<@" + message.author.id + ">",
								{
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
						message.channel.send(
							"<@" + message.author.id + ">",
							{
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
						message.channel.send(
							"**⚠ Retype as >gamble [amount]**"

						);
					}
				}
    },
    pay: function (message, args, con) {
        var user = args[1];
					var bal = args[2]
					user = user.replace(/\D/g,'');
					console.log(user);
					if(user != ""&&bal != ""&&user!=null&&bal!=null&&parseInt(bal)>0) {
						console.log("inputs not empty");
						con.query("SELECT * FROM `bot_users` WHERE `user_id` = \'"+user+"\'", function (err, result1) {
							console.log("inputs not empty");
							con.query("SELECT * FROM `bot_users` WHERE `user_id` = \'" + message.author.id + "\'", function (err, result2) {
								console.log("inputs not empty");
								if (parseInt(result2[0].balance) >= parseInt(bal)) {
									console.log("enough funds to send");
									var recNewBal = parseInt(result1[0].balance) + parseInt(bal);
									console.log("paid amount"+recNewBal);
									con.query("UPDATE `bot_users` SET `balance` = \'" + recNewBal + "\' WHERE `user_id` = \'" + user + "\'", function (err, result) {
									});
									var newBal = result2[0].balance - bal;
									console.log("payers new bal"+newBal);
									con.query("UPDATE `bot_users` SET `balance` = \'" + newBal + "\' WHERE `user_id` = \'" + message.author.id + "\'", function (err, result) {
										message.channel.send(
											"<@" + message.author.id + ">",
											{
											embed: {
												color: 6826080,
												footer: {
													text: ''
												},
												thumbnail:
													{
														url: "https://i.kym-cdn.com/entries/icons/original/000/028/315/cover.jpg"
													},
												title: 'Funds Sent!',
												url: ''

											}
										});
									});
								}else{
									message.channel.send(
										"<@" + message.author.id + ">",
										{
										embed: {
											color: 6826080,
											footer: {
												text: ''
											},
											thumbnail:
												{
													url: "https://i.kym-cdn.com/entries/icons/original/000/028/315/cover.jpg"
												},
											title: '⚠ Not Enough Funds',
											url: ''

										}
									});
								}
							});
						});
					}else{
						message.channel.send(
							"<@" + message.author.id + ">",
							{
							embed: {
								color: 6826080,
								footer: {
									text: ''
								},
								thumbnail:
									{
										url: "https://i.kym-cdn.com/entries/icons/original/000/028/315/cover.jpg"
									},
								title: '⚠ Invalid Input (>trade @user amount)',
								url: ''

							}
						});
					}
    }, 
    addbal: function (message, args, con) {
        var addedCoin = args[1];
		con.query("UPDATE `bot_users` SET `balance` = \'" + addedCoin + "\' WHERE `user_id` = \'" + message.author.id + "\'", function (err, result) {});
    }
}