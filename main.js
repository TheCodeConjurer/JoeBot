const { Client, GatewayIntentBits, GuildMemberManager} = require('discord.js');
const Discord = require('discord.js');

const config = require('./config.json');
const key = config.client.key;

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.MessageContent
  ],
  partials: ['MESSAGE', 'CHANNEL']
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
//console.log(msg.author.id);
    let channel = client.channels.cache.get(msg.channelId);
    if (msg.content === 'ping') {
        channel.send('pong');
    }
    if (msg.content.toLowerCase().includes("ghost trick")) {
        msg.delete();
    }
    if (msg.author.id === '1134163908538675220'){
            msg.delete();
}
});

function kick(user,msg){
    if(typeof user !== 'undefined'){
    user.kick(msg).catch(err => {console.log(err);});
    }
}

client.login(key);
