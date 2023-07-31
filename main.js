const { Client, GatewayIntentBits, GuildMemberManager} = require('discord.js');
const Discord = require('discord.js');

const config = require('./config.json');
const key = config.client.key;
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.MessageContent
  ],
  partials: ['MESSAGE', 'CHANNEL']
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
//client.login('myTokenID');
//    result.then((member) => {
//        console.log(member[1]);
//    });
});

async function kickRandom(guild){
await guild.members.fetch();
let members = [];
let exemptMembers = ['752563521929085048','417029219554426884','431887591789297685'];
guild.members.cache.forEach(member => {
    if(!member.user.bot){
        if (!exemptMembers.includes(member.user.id)){
            members.push(member)
        }
    }
});
return getRandom(members);
}

client.on('channelPinsUpdate', channel => {
    let pinsLeft;
    channel.messages.fetchPinned().then(data => {
        pinsLeft = Math.abs(50 - data.size + randomIntFromInterval(-5, 5));
        console.log(`${pinsLeft} pins left`)
        channel.send(`${pinsLeft} pins left`);
    });
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
//    if(msg.content === 't'){
//        console.log(msg);
//    }
    if(msg.content.toLowerCase() === '-vbucks'){
        const guild = client.guilds.cache.get("499975744286490624");
        kickRandom(guild).then(data => {
            data.kick("Get kicked scrub");
            channel.send(`👢 Kicked ${data.user.username}`)
            console.log(`Kicked ${data.user.username}`)
        });

    }
});

function getRandom(array){
  return array[Math.floor(Math.random()*array.length)];
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

client.login(key);
