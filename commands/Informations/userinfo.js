const Discord = require('discord.js');
const moment = require('moment');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'userinfo',
    aliases: ['ui'],
    category: 'Informations',
    description: 'Renvoit les informations d\'un utilisateur/membre',
    informations: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {

        try {
            let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member || message.author;

            const embed = new Discord.MessageEmbed()
    
            .setColor('#2f3136')
            .setAuthor(target.user.tag, `${target.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 512}))
            .addField(`__Informations Utilisateur__`, `${emojis.bc_username} Pseudo: **${target.user.username}**\n${emojis.bc_hastag} Discriminateur: **#${target.user.discriminator}**\n${emojis.bc_id} ID: **${target.user.id}**\n${emojis.bc_avatar} Avatar: [**Cliquez-ici**](${target.user.displayAvatarURL({dynamic: true})})\n${emojis.bc_temps} A crée son compte le: **${moment(target.createdAt).format('DD/MM/YYYY [à] HH:mm:ss')}**`)
            .addField(`__Informations Membre__`, `${emojis.bc_epingle} Rôle le plus haut: **${target.roles.highest}**\n${emojis.bc_temps} A rejoint le: **${moment(target.joinedAt).format('DD/MM/YYYY [à] HH:mm:ss')}**\n${emojis.bc_role} Rôles: (${target.roles.cache.size})\n${target.roles.cache.map(role => role.toString()).join(' ,')}`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
    
            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`userinfo\` est survenue dans **${message.guild.name}**.`)
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