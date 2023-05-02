const { MessageEmbed } = require("discord.js");
const Discord  = require("discord.js");

module.exports = {
    name: 'vanity',
    category: "info",
    usage: "vanity",
    run: async (client, message, args) => {
        if (!args.length) {
            const provideembed = new Discord.MessageEmbed()
            .setColor('WHITE')
            .setDescription(`${message.author.toString()},Please provide a vanity URL.`);
            return  message.channel.send({ embeds: [provideembed] });
          }
          const vanityUrl = args[0];
          const apiUrl = `http://discord.com/api/v9/invites/${vanityUrl}`;
          
          
          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.message === 'Unknown Vanity URL') {
                const availableEmbed = new Discord.MessageEmbed()
                .setColor('WHITE')
                .setDescription(`<:s_tick:1093784173426245703> ${message.author.toString()}: Vanity **${vanityUrl}** is **available**`);
              message.channel.send({ embeds: [availableEmbed] });
            } else {
                const takenEmbed = new Discord.MessageEmbed()
                .setColor('WHITE')
                .setDescription(`<:s_cross:1093541595334324326> ${message.author.toString()}: Vanity **${vanityUrl}** is **unavailable**`);
              message.channel.send({ embeds: [takenEmbed] });
            }
          } catch (error) {
            console.error(error);
            const errembed = new Discord.MessageEmbed()
            .setColor('WHITE')
            .setDescription(`<:s_warn:1093789533734195230> ${message.author.toString()}: There was an error checking the vanity`);
          message.channel.send({ embeds: [errembed] });
          }
        },
      }; 