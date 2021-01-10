function diceroll(max, message){
	if (max == undefined) {
		message.channel.send("Please provide a maximum value");
	} else {
		var rand = Math.floor(Math.random() * (max) ) + 1;
		url = "https://media2.giphy.com/media/3oz8xVlyQAXwnD9C2A/source.gif";
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

		message.channel.send({
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
}

module.exports = {
    command: function (message, args) {
        var max = args[1];
		diceroll(max, message);
    }
}