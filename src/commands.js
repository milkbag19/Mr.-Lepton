const poke_commands = require('./command_folder/poke')
const weather_commands = require('./command_folder/weather')
const dice_commands = require('./command_folder/dice')
const mtg_commands = require('./command_folder/mtg')
const database_commands = require('./command_folder/database')
const economy_commands = require('./command_folder/economy')
const image_search_commands = require('./command_folder/image_search')
const covid_commands = require('./command_folder/covid')
const help_commands = require('./command_folder/help')
const misc_commands = require('./command_folder/misc')

module.exports = {
    poke: function (message, args) {
        poke_commands.command(message, args)
    },
    weather: function (message, args) {
        weather_commands.command(message, args)
    },
    diceroll: function (message, args) {
        dice_commands.command(message,args)
    },
    mtg: function (message, args) {
        mtg_commands.command(message, args)
    },
    balance: function (message, con) {
        economy_commands.balance(message, con)
    },
    profile: function (message, con) {
        database_commands.profile(message, con)
    },
    work: function (message, con) {
        economy_commands.work(message, con)
    },
    query: function (message, con) {
        database_commands.query(message, con)
    },
    gamble: function (message, args,con ) {
        economy_commands.gamble(message, args, con)
    },
    pay: function (message, args, con) {
        economy_commands.pay(message, args, con)
    },
    addbal: function (message, args, con) {
        economy_commands.addbal(message, args, con)
    },
    image_search: function (message, args){
        image_search_commands.command(message, args)
    },
    covid: function (message, args) {
        covid_commands.command(message, args)
    },
    help: function (message) {
        help_commands.main(message)
    },
    exp: function (message, con) {
        database_commands.exp(message, con)
    },
    rps: function (message, args) {
        misc_commands.rps(message, args)
    },
    goodnews: function (message) {
        misc_commands.goodnews(message)
    },
    player: function (message) {
        help_commands.music(message)
    }

}
