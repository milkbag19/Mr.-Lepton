function howManyHundreds(num) {
	return Math.floor(num / 100);
}          

module.exports = {
    profile: function (message, con) {
        var sqls = "SELECT * FROM `bot_users` WHERE `user_id` = \'" + message.author.id + "\'";
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
			}
			message.channel.send("<@" + message.author.id + ">",
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
    },
    query: function (message, con) {
        con.query("SELECT * FROM `bot_users` WHERE 1", function (err, result2) {
			con.query("SELECT * FROM `servers` WHERE 1", function (err, result1) {
				var server_count = result1.length;
				var user_count = result2.length;
				message.channel.send(
					"<@" + message.author.id + ">",
					{
					embed: {
						color: 0xFF0000,
						footer: {
							text: ''
						},
						title: "Bot Data",
						fields:[
							{
								"name": "Total Users",
								"value": user_count
							},
							{
								"name": "Joined Servers",
								"value": server_count
							}
						]
					}
				});
			});
		});
    },
    exp: function (message, con) {
        var sqls = "SELECT `exp` FROM `bot_users` WHERE `user_id` = \'" + message.author.id + "\'";
		con.query(sqls, function (err, result2) {
			if (result2[0] != null) {
				rand2 = Math.round(Math.random() * 10);
				var exp = parseInt(result2[0].exp) + rand2;
				//console.log(howManyHundreds(parseInt(result2[0].exp)));
				//console.log(howManyHundreds(exp));
				var exp = parseInt(result2[0].exp) + rand2;
				var reqExp = 100;
				for (var i = 0; ; i++) {
					reqExp = (reqExp) + (100 * (1.15 * i));
					if (result2[0].exp < reqExp && exp > reqExp) {
						var get_current_coin = "SELECT `balance` FROM `bot_users` WHERE `user_id` = " + message.author.id + " ";
						var bal;
						con.query(get_current_coin, function (err, resultr) {
							if (err) throw err;
							bal = parseFloat(resultr[0].balance);
							//console.log(resultr[0].balance)

							var addedCoin = Math.round((10.0 * (exp / 1000.0)) + bal);
							//console.log(addedCoin);
							//console.log(bal);
							var addCoinSql = "UPDATE `bot_users` SET `balance` = \'" + addedCoin + "\' WHERE `user_id` = \'" + message.author.id + "\' ";
							con.query(addCoinSql, function (err, results) {
								if (err) throw err;
								console.log("added Coin");
							});
							if (i%5 == 0) {
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
							}
							
						});

						break;
					} else if (exp < reqExp) {
						break;
					} else {
					}

				}
				var sql2 = "UPDATE `bot_users` SET `exp`=\'" + exp + "\' WHERE user_id = \'" + message.author.id + "\'";
				con.query(sql2, function (err, result) {
					if (err) throw err;

				});


			}
		});
    }

}