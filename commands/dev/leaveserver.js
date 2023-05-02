const { MessageEmbed } = require('discord.js');
const shadyop = ['1033580960882626630', '1001288691223896094  ','1078204675213500427']
module.exports = {
  name: `leaveserver`,
  category: `dev`,
  aliases: [`leaveg`, `gleave`],
  description: `Leaves A Guild`,
  run: async (client, message, args) => {
    if(!shadyop.includes(message.author.id)) return;
    let id = args[0];
    if(!id){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | You didn't provided the server Id.`)]})
    }
    let guild = await client.guilds.fetch(id);
    let name = guild?.name || 'No Name Found';
    if(!guild){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | You didn't provided a valid server Id.`)]})
    }
    await guild.leave();
    return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} | Successfully left **${name} (${id})**.`)]})
  }
};