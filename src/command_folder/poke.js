var request = require('request');
var Pokedex = require('pokedex');
var pokedex = new Pokedex();
var Pokedexx = require('pokedex.js');
var pokedexx = new Pokedexx('en');
var dexEntries = require("../../assets/flavorText.json");
request('https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/data/pokedex.js', (err, res, body) => {
	if (!err && res.statusCode == 200) {
		dex = requireFromUrl('https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/data/pokedex.js').BattlePokedex;
	} else {
		console.log('Error fetching Showdown dex; Switching to local dex...');
		dex = require('../../pokedex.js').BattlePokedex;
	}
});
function capitalFirstLetter(string){
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
module.exports = {
    command: function (message, args) {
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
				console.log(">poke command issued");
		}else{

				message.channel.send("⚠ Pokemon not found in database!\n\n! NOTE - Gen 8 Pokemon have not been added to the database !").catch(console.error);
			}
		}catch(error){console.error(error);}
		}
}