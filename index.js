const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const config = require("./config.js");
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.login(config.token || process.env.TOKEN).catch(e => {
console.log("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!")
})
client.on("guildMemberAdd", member => {
  let kanal = db.fetch(`kanal_${member.guild.id}`)
  if (!kanal) return;
  let mod = db.fetch(`rol_${member.guild.id}`)
  if (!mod) return;
const randomWord = require('random-word');
  let word = randomWord();
  var image = `https://dummyimage.com/2000x500/33363c/ffffff&text=${word}`
  const embed = new EmbedBuilder()
  .setImage(image)
  .setColor("Red")
client.channels.cache.get(kanal).send({embeds: [embed], content: "<@"+member.id+">"})
db.set(`yazı_${member.id}`, word)
})
client.on("messageCreate", message => {
let yazı = db.fetch(`yazı_${message.author.id}`)
let mod = db.fetch(`rol_${message.guild.id}`)
if (!yazı) return;
if (message.content === yazı) {
message.react("✅")
message.guild.members.cache.get(message.author.id).roles.add(mod)
db.delete(`yazı_${message.author.id}`)

}

})
