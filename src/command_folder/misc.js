var news = require('good-news');


var foot = {
				text: 'Github : https://github.com/milkbag19/Mr.-Lepton',
				icon_url: 'https://i.imgur.com/XyikPAg.jpg'

			};

module.exports = {
    rps: function (message, args) {
        if (args[1] != "" && args[1] != null) {
			var player_move = args[1].toLowerCase()
			var bot_move = Math.floor(Math.random() * (3))
            var response = ""
            const moves = ["paper", "scissors", "rock"]
            const move_wins = { "paper": "rock", "scissors": "paper", "rock": "scissors" }
            const move_images =
            {
                "paper": "https://adiihd.github.io/rock-paper-scissors-game/img/paper.png",
                "scissors": "https://adiihd.github.io/rock-paper-scissors-game/img/scissors.png",
                "rock": "https://adiihd.github.io/rock-paper-scissors-game/img/rock.png"
            }

            message.channel.send({
            embed: 
            {
				color: 6826080,
				thumbnail:
				{
					url: move_images[moves[bot_move]]
				},
				title: "Mr. Leptop played "+moves[bot_move],
                url: '',
                footer: foot
            }
            })
            if (player_move == moves[bot_move])
            {
                response = "\n`` YOU TIED ``";
            }
            else if (moves[bot_move] == move_wins[player_move])
            {
                response = "\n`` YOU WON ``";
            } 
            else {
                response = "\n`` YOU LOST ``";
            }
            message.channel.send(response)
			
		}
    },
    goodnews: function (message) {
        		var rand2 = Math.round(Math.random() * 25);
				news((data) => {
					console.log();
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
									url: data[parseInt(rand2)].thumb
								},
							title: data[parseInt(rand2)].title,
							url: data[parseInt(rand2)].url,
							fields:[
								{
									"name": "Upvotes",
									"value": data[parseInt(rand2)].ups
								}
							]
						}
					});
				})
    }
}