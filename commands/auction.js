module.exports = {
    name: 'auction',
    async execute(Discord, client, message, args, disbut, MessageButton) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        let card = args[0]
        let bid = args[1]
        let user = args[2]
        let image = args[3]
        let bidwinner = 'None'

        let button = new disbut.MessageButton()
            .setLabel("Bid")
            .setID("Auction")
            .setStyle("green")
            .setEmoji("⬆️");

        let AuctionEmbed = new Discord.MessageEmbed()
            .setTitle(`Auction`)
            .setDescription(`${user} is hosting an auction!`)
            .addField(`Card`, `${card}`)
            .addField(`Bid Price`, `${bid} Tix / ${bid * 15} Gems`)
            .addField(`Bid Winner`, `${bidwinner}`)
            .setFooter('Notice: If you bid and you do not pay when you win, you will get banned.', 'https://static.wikia.nocookie.net/naruto/images/e/e4/Yahiko_infobox_image.png/revision/latest/scale-to-width-down/300?cb=20160126000222')
            .setColor(`#ff0000`)
            .setImage(`${image}`)

        let AuctionSend = await message.channel.send(AuctionEmbed, button)
        console.log(AuctionSend)
        bidwinner = 'None'
        const collector = AuctionSend.createButtonCollector((button) => true, { time: 86400000 }); //collector for 5 seconds
        let bidwinnerid = 'Nothing lol'
        collector.on('collect', async (b) => {
            console.log(b.id);
            b.reply.defer();
            if (b.id === "Auction") {
                if (b.clicker.user.username === bidwinner) {
                    client.users.cache.get(b.clicker.user.id).send(`You can't bid, You're already winning the bid.`);
                    return
                }
                else if (b.clicker.user.username != bidwinner) {
                let lastWinner = bidwinnerid
                bidwinnerid = b.clicker.user.id
                bid++
                bidwinner = b.clicker.user.username
                AuctionEmbed = new Discord.MessageEmbed()
                    .setTitle(`Auction`)
                    .setDescription(`${user} is hosting an auction!`)
                    .addField(`Card`, `${card}`)
                    .addField(`Bid Price`, `${bid} Tix / ${bid * 15} Gems`)
                    .addField(`Bid Winner`, `${bidwinner}`)
                    .setColor(`#ff0000`)
                    .setImage(`${image}`)
                    .setFooter('Notice: If you bid and you do not pay when you win, you will get banned.', 'https://static.wikia.nocookie.net/naruto/images/e/e4/Yahiko_infobox_image.png/revision/latest/scale-to-width-down/300?cb=20160126000222')
                AuctionSend.edit(AuctionEmbed)
                    .then(msg => console.log(`Updated the content of a message to ${msg.content}`))
                    .catch(console.error);
                const PingLog = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle(`Logs`)
                    .setDescription(`Command`, `Auction Bid`)
                    .addField(`Server`, `${message.guild.name}`)
                    .addField(`Channel`, `${message.channel.name}`)
                    .addField(`Ping`, `${client.ws.ping} ms`)
                    .addField(`User`, `${message.member.user.tag}`)
                    .addField(`Bid`, `${bid}`)
                    client.channels.cache.get('818409809035526144').send(PingLog)
                if (!lastWinner === bidwinner) return
                else {
                    if (lastWinner === 'Nothing lol') return
                    else {
                        client.users.cache.get(lastWinner).send(`You have been outbid by ${bidwinner}.`)
                    }
                }
                
                }
            }
        });


    },
};