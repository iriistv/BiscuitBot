const Discord = require('discord.js');
const moment = require('moment');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'serverinfo',
    aliases: ['si', 'serveurinfo'],
    category: 'Informations',
    description: 'Renvoit les informations du serveur',
    informations: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {
        
        try {
            const embed = new Discord.MessageEmbed()

            .setColor('#2f3136')
            .setTitle(`${message.guild.name}`)
            .setThumbnail(message.guild.iconURL({dynamic: true, size: 512}))
            .addField(`__Informations Membres__`, `${emojis.bc_membres} Membres: **${message.guild.memberCount}**\n${emojis.bc_bot} Bots: **${message.guild.members.cache.filter(m => m.user.bot).size}**\n${emojis.bc_administration} Administrateurs: **${message.guild.members.cache.filter(m => m.permissions.has(['ADMINISTRATOR'])).size}**`)
            .addField(`__Informations Générale__`, `${emojis.bc_id} ID: **${message.guild.id}**\n${emojis.bc_hastag} Salons: **${message.guild.channels.cache.size}**\n${emojis.bc_temps} Création: **${moment(message.guild.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss')}**\n${emojis.bc_owner} Créateur: **${message.guild.owner} (${message.guild.ownerID})**`)
            .addField(`__Informations Complémentaires__`, `${emojis.bc_role} Rôles: **${message.guild.roles.cache.size}**\n${emojis.bc_emoji} Emojis: ${message.guild.emojis.cache.size}`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
    
            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`serverinfo\` est survenue dans **${message.guild.name}**.`)
            .addField(`__La voici:__`, `\`\`\`JS\n${err}\`\`\``)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`Erreur`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur vient d'apparaître, mon développeur a été averti.`)
            .addField(`__La voici:__`, `\`\`\`JS\n${err}\`\`\``)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
        }
    }
}