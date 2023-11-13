const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = async (client, message, track) => {
    message.channel.send(new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setDescription(`${emojis.bc_musique} J'ai arrêté la musique car la queue était vide.`)
    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    )
};