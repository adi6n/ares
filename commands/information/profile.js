const {
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "profile",
  category: "info",
  aliases: ["badge", "badges", "achievement", "pr"],
  cooldown: 5,
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, guildData, player, prefix) => {
    
      const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
      
      const bxby = user.id === "976470654461288470" ? true : false;
      let badges = "";
        
     const guild = await client.guilds.fetch("1092693273174364230"); 

      const sus = await guild.members.fetch(user.id).catch((e) => {
        
      if(user) badges = badges;
      else badges = "`No Badge Available`";
      });
      if(bxby === true || user.id === "976470654461288470   ") badges = badges + `\n<:s_dev_e:1093807421568339988>・**Developer**`;
try{
      
const fyp = sus.roles.cache.has("1093781719506763776");
      if(fyp === true) badges = badges + `\n<:s_dev_e:1093807421568339988>・**Co Developer**`;
const own = sus.roles.cache.has("1093781719506763776");
      if(own === true) badges = badges+`\n<:s_owner:1093789039615815760>・**Owner**`;
      const han = sus.roles.cache.has("1093781720337227817");
      if(han === true) badges = badges + `\n<:s_admin:1093802149592453120>・**Admin**`;
      const manager = sus.roles.cache.has("1093781721419354194");
      if(manager === true) badges = badges + `\n<:s_mod:1093802325283442728>・**Mod**`;

     const aman = sus.roles.cache.has("1093781722350501950");
      if(aman === true) badges = badges + `\n<:s_info:1093789166250246206>・**Support Team**`;

      const supp = sus.roles.cache.has("1093781728583241829");
      if(supp === true) badges = badges + `\n<:s_vote:1093788370167136306>・**Supporter**`;

      const fr = sus.roles.cache.has("1093781729698922546");
      if(fr === true) badges = badges + `\n<:s_hoste:1093787892343640064>・**Friends**`;



}catch(err){
if(badges) {
badges = "";
badges = badges;
}
else if(badges === "") badges = "`No Badge Available`";
}


      const pr = new MessageEmbed()
.setAuthor(`Profile For ${user.username}#${user.discriminator}`, client.user.displayAvatarURL({dynamic: true})) 
.setThumbnail(user.displayAvatarURL({dynamic: true}))
//.setTitle(`${user.username}'s Profile`)
.setColor(client.color)
.setTimestamp()
.setDescription(`
**_BADGES_** <:s_boosts:1093808855311458355>
${badges ? badges : "`No Badge Available`"}`)
//.setTimestamp();
      message.channel.send({embeds: [pr]});
      
    }
  };