const Discord = require('discord.js');
const moment = require('moment');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'roleinfo',
    aliases: ['ri'],
    category: 'Informations',
    description: 'Renvoit les informations d\'un rôle',
    informations: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {

        try {
            const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

            if(!args.length) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez indiquer un rôle valide ou un ID de rôle valide.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
    
            if(!role || role.name === '@everyone' || role.name === '@here') return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez indiquer un rôle valide ou un ID de rôle valide.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const embed = new Discord.MessageEmbed()
    
            .setColor('#2f3136')
            .addField(`__${emojis.bc_support} Rôle__`, `${role}`, true)
            .addField(`__${emojis.bc_membres} Membres ayant ce rôle__`, `${role.members.size}`, true)
            .addField(`__${emojis.bc_hastag} Couleur__`, `${role.hexColor}`, true)
            .addField(`__${emojis.bc_temps} Date de Création__`, `${moment(role.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss')}`, true)
            .addField(`__${emojis.bc_avatar} Affiché Séparément__`, `${role.hoist ? `⠀⠀⠀⠀⠀⠀${emojis.bc_oui}` : `⠀⠀⠀⠀⠀⠀${emojis.bc_non}`}`, true)
            .addField(`__${emojis.bc_username} Mentionnable__`, `${role.mentionable ? `⠀⠀⠀⠀⠀${emojis.bc_oui}` : `⠀⠀⠀⠀⠀${emojis.bc_non}`}`, true)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
    
            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`roleinfo\` est survenue dans **${message.guild.name}**.`)
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