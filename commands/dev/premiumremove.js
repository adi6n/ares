const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, WebhookClient  } = require('discord.js');
const shadyop = ['1033580960882626630', '1001288691223896094  ','1078204675213500427']
module.exports = {
  name: "premiumremove",
  aliases: ['pmdel','pgdel','pr'],
  description: "owner only",

  run: async (client, message, args) => {
    if (!shadyop.includes(message.author.id)) return;
const guild = client.guilds.cache.get(args[0]) 
const error = new MessageEmbed()
.setDescription(`No Guild Id is provided to delete Premium System`)
.setColor(`AQUA`)
if(!guild) return message.channel.send({embeds: [error]})
// DATA STORE //
const dataBase = await client.db.get(`premium_${guild.id}`) || false;
if(!dataBase) return message.reply(`It don't have any premium plan`)
client.db.set(`premium_${guild.id}`,false);

// EMBED //
const done = new MessageEmbed()
.setDescription(`Premium has been deleted in ${guild}  `)
.setColor(`AQUA`)
message.channel.send({embeds: [done]})
//DATA SEND 
const rip = new Date();
const rep = new MessageEmbed()
.setTitle(`Thanks for removing ${client.user.username} Premium`)
.setDescription(
  ` Hey ! <@${message.guild.ownerId}> ,Your ${client.user.username} Premium has been removed ! Here is your  details
  By : [ SYSTEM ]
  Removed From : ${rip}
  For more info or help vist [support](https://discord.gg/astrox)
  `)
  .setFooter(`These Message is sent by System `)
  client.users.cache.get(guild.ownerId).send({embeds: [rep]}).catch((err) => {
    
  });
 

  // SEND TO SYSTEM ADMINS 
  const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1097031207042158623/WGhiZ5LbJBFe49uj09gMYmgJOMqjpQ0ACWMWwU2wD4OuwIF5e8wq9PNDrkc0iHUOTvwM' });
  let owner = await guild.fetchOwner()
    const join = new MessageEmbed()
  .setTitle(`PREMIUM Removed`)
    .addField(`NAME`, `${guild.name}`)
    .addField(`SERVER ID`, `${guild.id}`)
    .addField(`OWNER NAME`, `${owner.user.tag}`)
    .addField(`OWNER ID`, `${guild.ownerId}`)
    .addField(`TOTAL MEMBERS`, `${guild.memberCount}`)
    .addField(`VANITY CODE `, `${guild.vanityURLCode}`)
    .addField(`BOOST COUNT`, `${guild.premiumSubscriptionCount}`)
    .addField(`REMOVED AT `, `${rip}`)
    .addField(`REMOVED BY `, `${message.author.tag}`)
    .addField(`TIER TYPE `, `TIER [1]`)
    .setThumbnail(guild.iconURL({dynamic: true}))
    .setImage(guild.bannerURL({dynamic: true}))
    
   
webhookClient.send({
	username: 'Astrox',
	embeds: [join],
});

  }}