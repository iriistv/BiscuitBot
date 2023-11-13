const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = async (client, message, queue, track) => {
    message.channel.send(new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setAuthor(`${message.member.user.username}`, `${message.member.user.displayAvatarURL({dynamic: true})}`)
    .setThumbnail(`${track.thumbnail}`)
    .setTitle(`${track.title}`)
    .setDescription(`${emojis.bc_username} Auteur: **${track.author}**\n${emojis.bc_temps} Durée: **${track.duration}**`)
    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    )
};