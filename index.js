const Discord = require("discord.js")
const client = new Discord.Client();
const config = require("./config.json")
const fs = require('fs');
client.commands = new Discord.Collection
const disbut = require('discord-buttons');
const { MessageButton } = require('discord-buttons')
disbut(client);
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith
('.js'));
client.on("ready", async () => {
    console.log("Loaded up!")


    client.user.setActivity("Yah help | Auction Bot", {
      type: "STREAMING",
      url: "https://twitch.tv/discord"
    });
});

for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()
    if (!client.commands.has(command)) return;
    try{
      client.commands.get(command).execute(Discord, client, message, args, disbut, MessageButton);
    }catch(error){
      console.error(error)
      message.reply("There was an issue executing that command!");
    }


});
client.login('XXXXXXXXXXXX')
