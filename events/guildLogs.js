const client = require('../index');
const { MessageEmbed } =  require('discord.js');
const join = '1093781770429804684';
const leave = '1093781771495145593';
const db = require('../core/db');

module.exports = async (client) => {
  client.on("guildCreate", async (guild) => {
    const ser = client.guilds.cache.size;
    
    const use = client.guilds.cache.filter((guild) => guild.available).reduce((prev, guild) => prev + guild.memberCount, 0);
    
    const channel = await client.channels.fetch(join);
    var emoji = "";
    let own = await guild.fetchOwner()
    let links = guild.bannerURL({ dynamic: true, size: 1024 });
    if (guild.partnered && guild.verified)
      emoji = `<:s_partner:1093540991912378368><:s_verified:1093541348214325398>`;
    else if (guild.partnered && !guild.verified)
      emoji = "<:s_partner:1093540991912378368>";
    else if (!guild.partnered && guild.verified)
      emoji = "<:s_verified:1093541348214325398>";
    else if (!guild.partnered && !guild.verified)
      emoji = "<:s_cross:1093541595334324326>";
    const embed = new MessageEmbed()
      .setDescription(`Id: **${guild.id}**\nName: **${guild.name}**\nDiscord Level: ${emoji}\nMemberCount: \`${guild.memberCount + 1}\`\nCreated At: <t:${Math.round(guild.createdTimestamp / 1000)}> (<t:${Math.round(guild.createdTimestamp / 1000)}:R>)\nJoined At: <t:${Math.round(guild.joinedTimestamp / 1000)}> (<t:${Math.round(guild.joinedTimestamp / 1000)}:R>)`)
      .addField(`**Owner**`, `Info: **${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"} (${own.id})**\nMentions: <@${own.id}>\nCreated At: <t:${Math.round(own.user.createdTimestamp / 1000)}> (<t:${Math.round(own.user.createdTimestamp / 1000)}:R>)`)
      .addField(`**${client.user.username}'s Total Servers**`, `\`\`\`js\n${ser}\`\`\``, true)
      .addField(`**${client.user.username}'s Total Users**`, `\`\`\`js\n${use}\`\`\``, true)
      .addField(`**Shard Id**`, `\`\`\`js\n${guild.shardId}\`\`\``, true)
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({
        dynamic: true,
        size: 1024
      }))
      .setColor(client.color)
    if (guild.vanityURLCode) {
      let temp = `https://discord.gg/` + guild.vanityURLCode;
      embed.setURL(temp)
    }
    if (guild.banner)
      embed.setImage(links)
    await channel.send({embeds: [embed]})
  })


  client.on("guildDelete", async (guild) => {
    const ser = client.guilds.cache.size;
  
    const use = client.guilds.cache.filter((guild) => guild.available).reduce((prev, guild) => prev + guild.memberCount, 0);

    const channel = await client.channels.fetch(leave);
    let links = guild.bannerURL({ dynamic: true, size: 1024 });
    const embed = new MessageEmbed()
      .setDescription(`Id: **${guild.id}**\nName: **${guild.name}**\nMemberCount: \`${guild.memberCount + 1}\`\nCreated At: <t:${Math.round(guild.createdTimestamp / 1000)}> (<t:${Math.round(guild.createdTimestamp / 1000)}:R>)\nJoined At: <t:${Math.round(guild.joinedTimestamp / 1000)}> (<t:${Math.round(guild.joinedTimestamp / 1000)}:R>)`)
      .addField(`**${client.user.username}'s Total Servers**`, `\`\`\`js\n${ser}\`\`\``, true)
      .addField(`**${client.user.username}'s Total Users**`, `\`\`\`js\n${use}\`\`\``, true)
    if (guild.available)
      embed.setTitle(guild.name)
    embed.setThumbnail(guild.iconURL({
      dynamic: true,
      size: 1024
    }))
    embed.setColor(client.color)
    if (guild.vanityURLCode) {
      let temp = `https://discord.gg/` + guild.vanityURLCode;
      embed.setURL(temp)
    }
    if (guild.banner)
      embed.setImage(links)
    await channel.send({embeds: [embed]})
  })
}