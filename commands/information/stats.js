const { MessageEmbed } = require("discord.js");
const Discord  = require("discord.js");

module.exports = {
    name: "stats",
    category: "info",
    aliases: ['botinfo'],
    usage: "stats",
    run: async (client, message, args, guildData, player, prefix) => {
        try {
            let dev = [], cdev = [], supp =[];
            let user = await client.users.fetch(`1078204675213500427`);//sd2
            dev.push(`[${user.username}](https://discord.com/users/1078204675213500427)`);
            let user2 = await client.users.fetch(`976470654461288470`);//shadymmon1
            dev.push(`[${user.username}](https://discord.com/users/976470654461288470)`);
            const statsEmbed = new Discord.MessageEmbed()
			        .setColor(client.color)
              .setAuthor(`${client.user.username} 's Information`, client.user.displayAvatarURL())
              .setThumbnail(message.guild.iconURL({dynamic: true}))
              .setDescription(`**Bot's Mention: <@${client.user.id}>\nBot's Tag: ${client.user.tag}\nTotal Servers: ${client.guilds.cache.size}\nTotal Users: ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\nTotal Channels: ${client.channels.cache.size}**`)
              .addFields([
                {name: `**__Developers__**`, value: dev.join(`, `) },
                {name: `**__Supporters__**`, value: supp.join(`, `) }
              ])
            message.channel.send({embeds: [statsEmbed]});
        } catch (e) {
          const emesdf = new MessageEmbed()
    			.setColor(client.color)
		    	.setAuthor(`An Error Occurred`)
			    .setDescription(`\`\`\`${e.message}\`\`\``);
			    return message.channel.send({embeds: [emesdf]});
        }
    }
}