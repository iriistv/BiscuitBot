const Discord = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const intents = new Discord.Intents();
intents.add (
    'GUILD_MEMBERS',
    'GUILDS',
    'GUILD_VOICE_STATES',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_BANS',
    'GUILD_INVITES',
    'GUILD_EMOJIS',
    'GUILD_VOICE_STATES',
);

const client = new Discord.Client({
    fetchAllMembers: true,
    autoReconnect: true,
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION', 'GUILD_VOICE_STATES'],
    intents: intents,
});

const config = require('./data/config.json');

const { GiveawaysManager } = require('discord-giveaways');
const manager = new GiveawaysManager(client, {
    storage: './data/giveaways.json',
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: '#2f3136',
        reaction: '🎉'
    }
});

const { Player } = require('discord-player');
const player = new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.giveawaysManager = manager;
client.player = player;
module.exports = client;

fs.readdirSync('./commands').forEach(folder => {
    const commands = fs.readdirSync(`./commands/${folder}/`).filter(file => file.endsWith('.js'));
    for(let file of commands) {
        let command = require(`./commands/${folder}/${file}`);
        if(command.name) {
            try {
                client.commands.set(command.name, command);
            } catch(err) {

            }
        } else {
            continue;
        }
        if(command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => client.aliases.set(alias, command.name));
    }
});

fs.readdirSync('./events/client').forEach(folder => {
    const events = fs.readdirSync(`././events/client/${folder}/`).filter(file => file.endsWith('.js'));
    for(let file of events) {
        let event = require(`././events/client/${folder}/${file}`);
        if(event.name) {
            try {
                client.events.set(event.name, event);
            } catch(err) {

            }
        } else {
            continue;
        }
    }
});

mongoose.connect(`${config.mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log(`MongoDb ➜ ✅`);
}).catch((err) => {
    console.log(`MongoDb ➜ ❌, ${err}`);
});

client.options.restTimeOffset = 0;

client.login(config.token)