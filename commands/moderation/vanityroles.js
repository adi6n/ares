const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
module.exports = {
    name: 'vanityroles',
    category: 'mod',
    description: 'Adds a specified role to users based on their custom status',
    run: async (client, message, args) => {
        const roleName = args.pop().trim();
        const statusText = args.join(' ');
        const guild = message.guild;

        //#logchannel
        const logChannelName = "#" + args.pop().substring(2);
        const logChannel = message.guild.channels.cache.find(channel => (channel.type === "text" && channel.name.toLowerCase() === logChannelName.toLowerCase()));
        
        //get the role object
        const role = guild.roles.cache.find(role => role.name === roleName);
        
        if (!role) {
            message.reply(`${roleName} is not a valid role`);
            return;
        }
        
        const members = guild.members.cache.filter(member => {
            const presence = member.presence;
            if (presence.status === "offline") { return false; }
            if (!presence.activities) { return false; } 

            const activity = presence.activities.find(activity => activity.type === "CUSTOM_STATUS");
            if (!activity || !activity.state) { return false; } 

            return activity.state.toLowerCase().includes(statusText.toLowerCase());
        });
  
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Vanity Roles`)
            .setDescription(`Added ${role} to the following members:`);

        members.forEach(member => {
            member.roles.add(role).then(() => {
                embed.addField(member.user.tag, `${role}`, true);
            }).catch(error => {
                message.reply(`Couldn't add ${roleName} to ${member.user.tag}: ${error.message}`);
            });
        });

        if (members.size > 0) {
            message.channel.send(embed);
        }
        else {
            message.reply(`No members found with the custom status "${statusText}"`);
        }

        if (logChannel) {
            logChannel.send(embed);
        }
    },
};