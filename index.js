const { Client, Collection, MessageEmbed, MessageButton, MessageActionRow, WebhookClient, Intents } = require("discord.js");
const client = new Client({ intents: 32767 });
const wait = require('wait');
const { Database } = require('quickmongo');
const settings = require('./core/settings');
const web = new WebhookClient({ url: '' }); 
const phin = require('phin').unpromisified;
const chalk = require('chalk');
const { readdirSync } = require("fs");
const util = require('./handler/util.js');
const GiveawayManager = require("./handler/GiveawayManager");
const config = require("./config");
const data = require("./config");



client.emoji = {
  'tick': '<:s_tick:1093784173426245703>',
  'cross': '<:s_cross:1093541595334324326>',
  'dot': '<a:s_dot:1093784644740194304> ',
  'giveaway': '<:s_giveaway:1093786091837993021>'
};






  const db = new Database('');
  db.connect();
  require(`./core/db.js`)

  client.giveawaysManager = new GiveawayManager(client);
  client.commands = new Collection();
  client.slashCommands = new Collection();
  client.categories = readdirSync("./commands/");
  client.util = new util(client);
  client.db = db;
  client.color = '00e3ff';
  require("./database/connect")();
  
  readdirSync("./events/").forEach(file => {
      let eventName = file.split(".")[0];
      require(`./events/${file}`)(client);
      console.log(`[ EVENTS ] Client event named ${eventName} loaded`);
  });
  
  require("./handler")(client);



client.login(data.token);
module.exports = client;

process.on('unhandledRejection',async(err) => {
  console.error(err);
});
process.on('uncaughtException',async(er) => {
  console.error(er)
});
