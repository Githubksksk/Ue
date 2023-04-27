const {EmbedBuilder} = require("discord.js");
const db = require("croxydb")
exports.run = async (client, message, args) => {
let rol = message.mentions.channels.first()
if (!rol) return message.reply("Lütfen bir kanal etiketle!")
message.reply("Başarılı!")
db.set(`kanal_${message.guild.id}`, rol.id)
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "kanal"
};
