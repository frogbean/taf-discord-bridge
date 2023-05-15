// Import necessary libraries
const irc = require('irc-upd')
const chalk = require('chalk')
const config = require('./config.json')
const { Client, Events, GatewayIntentBits } = require('discord.js')

let shareurl = `https://discord.com/api/oauth2/authorize?client_id=${config.discord.id}&permissions=3072&scope=bot`

// Create new Discord client
const discordClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] })

discordClient.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
    console.log(`auth url ${chalk.whiteBright(shareurl)}\n`)
})

// Setup IRC client
let ircClient = new irc.Client(config.irc.host, config.irc.name, {
    channels: config.irc.channels,
})

// Set up handlers for the IRC client
ircClient.addListener('message', function (from, to, message) {

    message = `<${from}> ${message}` //irc to discord

    for(const filter of config.discord.filter) {
        let replacement = '\\*'.repeat(filter.length)
        message = message.replaceAll(filter, replacement)
    }

    let consoleOutput = `irc`.padEnd(8) + ' | ' + message
    console.log(chalk.yellowBright(consoleOutput))

    //send to all discord channels
    for(const discord of config.discord.servers) {
        let guild = discordClient.guilds.cache.get(discord.server)
        if(!guild) continue
        for(const channelName of discord.channels) {
            let channel = guild.channels.cache.find(ch => ch.name === channelName)
            if(!channel) continue
            channel.send(message)
        }
    }

})

// Log in the Discord client
discordClient.login(config.discord.token);

// Set up handlers for the Discord client

discordClient.on('messageCreate', msg => {

    if (msg.author.bot) return; //stop feedback loops

    //attachments
    let attachments = []
    if(msg.attachments) 
        for(const [id, attachment] of msg.attachments)
            attachments.push(attachment.url)
        
    msg.content += ' ' + attachments.join(' ')

    //fuck knows what this does, probably elfish
    const discord = config.discord.servers.find(d => d.server === msg.guild.id)
    if (!discord || !discord.channels.includes(msg.channel.name)) return

    //formatting
    let message = `${msg.content}` //do your formating here, msg.author for name

    //output
    console.log(chalk.cyanBright(`discord`.padEnd(8) + ' | ' + message))

    for(const channel of config.irc.channels)
        ircClient.say(channel, message);
});

