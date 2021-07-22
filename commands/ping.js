module.exports = {
    name: 'ping',
    execute(Discord, client, message, args) {
        message.reply(`Pong **(${client.ws.ping}ms)**`);
        const PingLog = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`Logs`)
            .setDescription(`Command`, `Ping`)
            .addField(`Server`, `${message.guild.name}`)
            .addField(`Channel`, `${message.channel.name}`)
            .addField(`Ping`, `${client.ws.ping} ms`)
            .addField(`User`, `${message.member.user.tag}`)
            client.channels.cache.get('818409809035526144').send(PingLog)
    },
  };