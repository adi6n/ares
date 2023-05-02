const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, WebhookClient  } = require('discord.js');
const shadyop = ['1033580960882626630', '1001288691223896094  ','1078204675213500427']
module.exports = {
  name: "premiumadd",
  aliases: ['pmadd','pgadd','pg'],
  description: "owner only",

  run: async (client, message, args) => {
    if (!shadyop.includes(message.author.id)) return;
const guild = client.guilds.cache.get(args[0]) 
const error = new MessageEmbed()
.setDescription(`No Guild Id is provided to activate Premium System`)
.setColor(`AQUA`)
if(!guild) return message.channel.send({embeds: [error]})
// DATA STORE //
const dataBase = await client.db.get(`premium_${guild.id}`);
if(dataBase) return message.reply(`It has already an active premium plan!`)
client.db.set(`premium_${guild.id}`,true);

// EMBED //
const done = new MessageEmbed()
.setDescription(`Congratulations ! Premium has been activated in ${guild}  `)
.setColor(`AQUA`)
message.channel.send({embeds: [done]})
//DATA SEND 
const rip = new Date();
const rep = new MessageEmbed()
.setTitle(`Thanks for purchasing ${client.user.username} Premium`)
.setDescription(
  ` Thanks ! <@${message.guild.ownerId}> for Purchasing ${client.user.username} Premium ! Here is your premium details
  Activated By : [ SYSTEM ]
  Activated On : ${rip}
  Premium Type : TIER[1]
  For more info or help vist [support](https://discord.gg/astrox)
  `)
  .setFooter(`These Message is sent by System `)
  client.users.cache.get(guild.ownerId).send({embeds: [rep]}).catch((err) => {
    
  });
 

  // SEND TO SYSTEM ADMINS 
  const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1097031207042158623/WGhiZ5LbJBFe49uj09gMYmgJOMqjpQ0ACWMWwU2wD4OuwIF5e8wq9PNDrkc0iHUOTvwM' });
  let owner = await guild.fetchOwner()
    const join = new MessageEmbed()
  .setTitle(`PREMIUM ACTIVATED`)
    .addField(`NAME`, `${guild.name}`)
    .addField(`SERVER ID`, `${guild.id}`)
    .addField(`OWNER NAME`, `${owner.user.tag}`)
    .addField(`OWNER ID`, `${guild.ownerId}`)
    .addField(`TOTAL MEMBERS`, `${guild.memberCount}`)
    .addField(`VANITY CODE `, `${guild.vanityURLCode}`)
    .addField(`BOOST COUNT`, `${guild.premiumSubscriptionCount}`)
    .addField(`ACTIVATED AT `, `${rip}`)
    .addField(`ACTIVATED BY `, `${message.author.tag}`)
    .addField(`TIER TYPE `, `TIER [1]`)
    .setThumbnail(guild.iconURL({dynamic: true}))
    .setImage(guild.bannerURL({dynamic: true}))
    
   
webhookClient.send({
	username: 'Retrox',
	embeds: [join],
});

  }}