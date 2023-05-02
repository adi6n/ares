const { MessageEmbed } = require('discord.js'),
  st = require('../../core/settings').bot;


module.exports = {
  name: 'antinuke',
  aliases: ['antiwizz', 'an'],
  category: 'security',
  run: async (client, message, args) => {
    let prefix = message.guild.prefix || '&';
    const option = args[0];
    const isActivatedAlready = await client.db.get(`${message.guild.id}_antinuke`);
    const antinuke = new MessageEmbed()
      .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
      .setColor(client.color)
      .setTitle(`__**Antinuke**__`)
      .setDescription(`<a:s_dot:1093784644740194304> It bans admins for doing suspicious activites in the server.\n<a:s_dot:1093784644740194304> It ignores the ones who are whitelisted.\n<a:s_dot:1093784644740194304> Antinuke should be enabled to protect the server.`)
      .addFields([
        { name: `__**Antinuke Enable**__`, value: `To Enable Antinuke, Use - \`${prefix}antinuke enable\`` },
        { name: `__**Antinuke Disable**__`, value: `To Disable Antinuke, Use - \`${prefix}antinuke disable\`` }
      ])

    if (message.author.id === message.guild.ownerId) {
      if (!option) {
        message.reply({ embeds: [antinuke] });
      } else if (option === 'enable') {
        if (isActivatedAlready) {
          const enabnble = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(client.color)
            .setDescription(`**  ${message.guild.name} security settings <:s_admin:1093803064139452436>
Ohh uh! looks like your server has already enabled security

Current Status : <:s_tick:1093784173426245703>

To disable use ${prefix}antinuke disable **`)
          message.channel.send({ embeds: [enabnble] })
        } else {
          await client.db.set(`${message.guild.id}_antinuke`, true);
          const enable = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor({name: `${client.user.username} Security`, iconURL: client.user.displayAvatarURL()})
            .setColor(client.color)
            .setDescription(`
    **  ${message.guild.name} Security Settings ** <:s_admin:1093803064139452436>
      ** 
Anti Ban <:s_tick:1093784173426245703>
Anti Kick <:s_tick:1093784173426245703>
Anti Unban <:s_tick:1093784173426245703>
Anti Role-Create <:s_tick:1093784173426245703>
Anti Role-Delete <:s_tick:1093784173426245703>
Anti Role-Update <:s_tick:1093784173426245703>
Anti Channel-Create <:s_tick:1093784173426245703>
Anti Channel-Delete <:s_tick:1093784173426245703>
Anti Channel-Update <:s_tick:1093784173426245703>
Anti Emoji Create <:s_tick:1093784173426245703>
Anti Emoji Update <:s_tick:1093784173426245703>
Anti Emoji Delete <:s_tick:1093784173426245703>
Anti Webhook Create <:s_tick:1093784173426245703>
Anti Webhook Update <:s_tick:1093784173426245703>
Anti Webhook Delete <:s_tick:1093784173426245703>
Anti Sticker Create <:s_tick:1093784173426245703>
Anti Sticker Update <:s_tick:1093784173426245703>
Anti Sticker Delete <:s_tick:1093784173426245703>
Anti Everyone/Here <:s_tick:1093784173426245703>
Anti Server-Update <:s_tick:1093784173426245703>
Anti Prune <:s_tick:1093784173426245703>
Anti Bot Add <:s_tick:1093784173426245703>
Anti Vanity Steal <:s_tick:1093784173426245703>

Auto Recovery <a:stolen_emoji:965675086956871720>
Enabled antinuke for this server
      **`)
          message.channel.send({ embeds: [enable] })
          await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
        }
      } else if (option === 'disable') {
        if (!isActivatedAlready) {
          const dissable = new MessageEmbed().setThumbnail(client.user.displayAvatarURL())
            .setColor(client.color)
            .setDescription(` ** ${message.guild.name} security settings <:s_admin:1093803064139452436>
Ohh NO! looks like your server doesn't enabled security

Current Status : <:s_cross:1093541595334324326>

To enable use ${prefix}antinuke enable ** `)
          message.channel.send({ embeds: [dissable] })
        } else {
          await client.db.set(`${message.guild.id}_antinuke`, null);
          const disable = new MessageEmbed().setThumbnail(client.user.displayAvatarURL())
            .setColor(client.color)
            .setDescription(`** ${message.guild.name} security settings <:s_tick:1093784173426245703>
Successfully disabled security settings.

Current Status : <:s_cross:1093541595334324326> 

To enable again use ${prefix}antinuke enable **`)
          message.channel.send({ embeds: [disable] })
        }
      }
    } else {
      message.reply({ embeds: [new MessageEmbed().setColor(client.color).setDescription('<:s_cross:1093541595334324326> | Only Server Owner Can Run This Command.')] });
    }
  }
}