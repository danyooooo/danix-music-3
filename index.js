require('dotenv').config();

const fs = require('fs');
const { Collection } = require('discord.js');
const Client = require('./client/Client');
const { Player } = require('discord-player');
const events = require('./client/Events');
const { DefaultExtractors } = require('@discord-player/extractor');
const { YoutubeiExtractor } = require('discord-player-youtubei')

const client = new Client();

client.commands = new Collection();
client.timers = new Map();
client.playlists = new Map();
client.stayConnected = new Map();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const player = new Player(client);

player.extractors.loadMulti(DefaultExtractors);
player.extractors.register(YoutubeiExtractor, {});

events(client, player);

client.login(process.env.DISCORD_TOKEN);