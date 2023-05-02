const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "userinfo",
    aliases: ['ui', 'whois'],
    category: 'info',
    description: "To Get Information About A User",
    run: async (client, message, args) => {
        const permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MENTION_EVERYONE": "Mention Everyone"
        }
        const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const nick = mention.nickname === null ? "None" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
        const usericon = mention.user.displayAvatarURL({dynamic: true});
        const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        var flags = {
            "DISCORD_EMPLOYEE": "<:s_admin:1093802149592453120>",
            "DISCORD_PARTNER": "<:s_partner:1093540991912378368>",
            "BUGHUNTER_LEVEL_1": "<:s_bughunter:1093806091592290324>",
            "BUGHUNTER_LEVEL_2": "<:s_bughunter:1093806091592290324>",
            "HYPESQUAD_EVENTS": "<:s_vote:1093788370167136306>",
            "HOUSE_BRILLIANCE": "<:s_hy_br:1093806470077890590>",
            "HOUSE_BRAVERY": "<:s_hy_brv:1093806585538674708>",
            "HOUSE_BALANCE": "<:s_hy_bal:1093806732838441021>",
            "EARLY_SUPPORTER": "<:s_earlysup:1093806907690586124>",
            "TEAM_USER": "<:s_hoste:1093787892343640064>",
            "VERIFIED_BOT": "<:s_v_bot:1093807244866494534>",
            "EARLY_VERIFIED_DEVELOPER": "<:s_dev_e:1093807421568339988>"
        };
        var bot = {
            "true": "Bot",
            "false": "Human"
        };
        const userFlags = message.member.user.flags.toArray();
        const userlol = new MessageEmbed()
        .setAuthor({ name: `${mention.user.username}'s Information`, iconURL: mention.user.avatarURL()}) 
        .setThumbnail(usericon)
        .addField(`General Information`, `Name: \`\`${mention.user.username}\`\`\nDiscriminator: \`${mention.user.discriminator}\` \nNickname: \`${nick}\``)
        .addField(`Overview`, `Badges: ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'}\nType: ${bot[mention.user.bot]}`)
        .addField(`Server Relating Information`, `Roles: ${mention._roles[0] ? `<@&${mention._roles.join(">  <@&")}>` : `\`No roles\``}  \nKey Permissions: \`${finalPermissions.join(', ')}\``)
        .addField(`Misc Information`, `Created On: <t:${Math.round(mention.user.createdTimestamp/1000)}:R>\nJoined On: <t:${Math.round(mention.joinedTimestamp/1000)}:R>`)
        .setThumbnail(mention.user.avatarURL())
        .setFooter({ text: `Requested By: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true}) })
        .setTimestamp()
        .setColor(client.color);
        message.reply({ embeds: [userlol] })
    }
}