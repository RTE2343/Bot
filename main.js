const { Client, Intents, DiscordAPIError } = require('discord.js');
const { token } = require('./config.json');
Discord = require("discord.js")
const client = new Client({ intents: [8] });

const prefix = '-';

const fs = require('fs');
 
client.commands = new Discord.Collection();

const commmandFiles = fs.readdirSync('./commmands/').filter(file => file.endsWith('.js'))

for(const file of commmandFiles) {
    const command = require('./commands/${file}');
    client.commands.set(commmand.name, command)
}


client.once('ready', () => {
    console.log('Готов!');
});

client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        //message.channel.send('pong!');
        client.commands.get('ping').execute(message, args);


    } else if (command == 'youtube'){
        message.channel.send('https://www.youtube.com/channel/UCn2zNDHGzwJrgJVT-LIQ-Eg');
    }
});



client.login(token);