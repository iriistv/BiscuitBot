const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = async (client, message, track, query) => {
    message.channel.send(new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setDescription(`${emojis.bc_cross} Je n'ai trouvé aucune musique.`)
    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    )
};