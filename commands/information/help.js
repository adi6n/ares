const {
  MessageEmbed,
  Message,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  Client
} = require("discord.js");
const Settings = require('../../core/settings.js');
const client = require('../../index');
const db = require('../../core/db');

module.exports = {
name: 'help',
aliases: ['h'],
category: 'info',
run: async (client, message, args) => {
  let prefix = await db.get(`prefix_${message.guild.id}`);
  if (!prefix) prefix = Settings.bot.info.prefix;
  const r1 = new MessageActionRow().addComponents(
    new MessageButton().setStyle(`SECONDARY`).setCustomId(`p1`).setEmoji(`<:s_admin:1093802149592453120>`),
    new MessageButton().setStyle(`SECONDARY`).setCustomId(`p2`).setEmoji(`<:s_admin:1093803064139452436>`),
    new MessageButton().setStyle(`SECONDARY`).setCustomId(`p3`).setEmoji(`<:s_utils:1093802452257615872>`),
    new MessageButton().setStyle(`SECONDARY`).setCustomId(`p4`).setEmoji(`<:s_giveaway:1093786091837993021>`)
  );
  const r2 = new MessageActionRow().addComponents(
    new MessageButton().setStyle(`SECONDARY`).setCustomId(`p5`).setEmoji(`<:s_discord:1093802675918868511>`),
    new MessageButton().setStyle(`SECONDARY`).setCustomId(`p6`).setEmoji(`<:s_files:1093802899911475241>`),
    new MessageButton().setStyle(`SECONDARY`).setCustomId(`p7`).setEmoji(`<:s_mod:1093802325283442728>`),
    new MessageButton().setStyle(`SECONDARY`).setCustomId(`p8`).setEmoji(`<:s_spaceship:1093803278103490591>`)
  );
 
  const embed = new MessageEmbed()
  .setColor("AQUA")
  .setAuthor({ name: `${client.user.tag} Help Panel`, iconURL: client.user.displayAvatarURL({dynamic: true})})
  .setDescription(`\`\`\`yaml\n<> - Required Arguement | () - Optional Arguement\`\`\``)
  .addFields([{name : `<:s_folder:1093811470724247583> __Main__` , value : `>>> <:s_admin:1093802149592453120> AntiNuke \n <:s_admin:1093803064139452436> Moderation \n <:s_utils:1093802452257615872> Utility \n <:s_giveaway:1093786091837993021> Giveaway` , inline : true},
        {name : `<:s_gwend:1093787571596840970> __Extra__` , value : `>>> <:s_discord:1093802675918868511> Fun \n <:s_files:1093802899911475241> Image \n <:s_mod:1093802325283442728> Custom Roles \n <:s_spaceship:1093803278103490591> Welcomer` , inline : true},
        {name : `<:s_web:1097039223678320641> __Links__` , value : `**[Invite Me](https://discord.com/api/oauth2/authorize?client_id=1086164903162826852&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/astrox) **` , inline : false}
]).setThumbnail(message.guild.iconURL({dynamic : true}))
  message.channel.send({embeds: [embed], components: [r1,r2]})
}
}

function embeds(embed, prefix, ping) {
if (embed === 'help') {
  return new MessageEmbed()
    .setColor('FF0000')
    .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://discord.gg/astrox")
    .setDescription(`**<:s_ram:1093789394684628993> My Default Prefix Is  &**

**<a:s_dot:1093784644740194304> A Best Antinuke Security Bot With Many More Advance Features
<a:s_dot:1093784644740194304> ${client.user.username} Provides You Best Premium Security Features 
<a:s_dot:1093784644740194304> [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [Support](https://discord.gg/TCf2JQafK8) | Total ${client.commands.size - 1} Commands **

**Choose One Of The Category Below : **

<:s_info:1093789166250246206>  **__Main Module__**
>  **<:s_admin:1093802149592453120> Antinuke **
>  **<:s_mod:1093802325283442728>Moderation**
>  **<:skye_whitelist:1024952571535827014> Whitelist** `);
  
} else if (embed === 'x') {
  return new MessageEmbed()
    .setColor("FF0000")
    .setDescription("**MODERATION** `ban`,`kick`,`unban`,`mute`,`unmute`,`lock`,`unlock`,`unhide`,`hide`,`unbanall`,`nuke`")
} else if (embed === 'toggle') {
  return new MessageEmbed()
  .setColor('FF0000')
  .setDescription(`**ANTINUKE COMMANDS**

>  To Enable Use :  \`-antinuke enable\`
>  To Disable Use :  \`-antinuke disable\`

Enabling Antinuke Will Feature Your Server : 

• \`Anti Ban\`,\`Anti Kick\`,\`Anti Unban\`,\` Anti Role Create\`,\`Anti Role Update \`,\`Anti Role Delete\`,\` Anti Channel Create\`,\`Anti Channel Delete\`,\`Anti Channel Update\`, \`Anti Emoji Create\` , \`Anti Emoji Delete\` , \`Anti Emoji Update\`,\`Anti Webhook Create \`,\`Anti Webhook Update\`,\`Anti Webhook Delete\`,\`Anti Sticker Create\`,\`Anti Sticker Update\`,\`Anti Sticker Delete\`,\`Anti Everyone/Here \`,\`Anti Server Update \`,\`Anti Prune \`,\`Anti Bot Add \`,\`Anti Vanity Steal \``);

} 
}
