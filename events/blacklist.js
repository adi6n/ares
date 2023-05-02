const client = require('../index'),
  st = require("../core/settings"),
  db = require('../core/db.js');
  const {MessageEmbed} = require(`discord.js`)
module.exports = async (client) => {
    /* On guild join */
    client.on('guildCreate', async (guild) => {
        const bl = await client.db.get(`blacklist_${guild.ownerId}`) || 'lol'
        if(bl === true){
            const embed = new MessageEmbed()
            .setDescription("<:s_cross:1093541595334324326> | Guild blacklisted")
            .setColor("DARK_BUT_NOT_BLACK")
            client.users.cache.get(guild.ownerId).send({embeds: [embed]}).catch(err => {})
            await guild.leave()
        }
    });


}