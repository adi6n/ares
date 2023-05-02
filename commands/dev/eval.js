const { Message, Client, MessageEmbed,MessageActionRow,MessageButton } = require("discord.js");
const shadyop = ['1033580960882626630', '1001288691223896094  ','1078204675213500427']
module.exports = {
  name: "eval",
  aliases: ['ev', 'jaduexe'],
  category: 'dev',
  run: async (client, message, args) => {
        
      if(!shadyop.includes(message.author.id)) return
      const content = message.content
        .split(" ")
        .slice(1)
        .join(" ");
      const result = new Promise(resolve => resolve(eval(content)));

      return result
        .then(output => {
          if (typeof output !== "string") {
            output = require("util").inspect(output, { depth: 0 });
          }
          if (output.includes(client.token)) {
            output = output.replace(
              client.token,
              "LOL BRO"
            );
          }
          const user = new MessageEmbed()
          .setColor(client.color)
          .setDescription(`\`\`\`js\n${output}\`\`\``)
          message.channel.send({embeds: [user]});
        })
        .catch(err => {
          err = err.toString();
          if (err.includes(client.token)) {
            err = err.replace(client.token, "");
          }
          message.channel.send(err, {
            code: "js"
          });
        });
    
}};