const Discord = require('discord.js');
const { version: djsversion } = require('discord.js');
const moment = require('moment');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'botinfo',
    aliases: ['bi'],
    category: 'Informations',
    description: 'Renvoit les informations du bot',
    informations: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {

        try {
            const embed = new Discord.MessageEmbed()

            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .addField(`__Informations Utilisateur__`, `${emojis.bc_username} Pseudo: **${client.user.username}**\n${emojis.bc_hastag} Discriminateur: **#${client.user.discriminator}**\n${emojis.bc_id} ID: **${client.user.id}**\n${emojis.bc_temps} Compte crée le: **${moment(client.user.createdAt).format('DD/MM/YYYY [à] HH:mm:ss')}**`)
            .addField(`__Informations Globale__`, `${emojis.bc_role} Serveurs: **${client.guilds.cache.size}**\n${emojis.bc_membres} Utilisateurs: **${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}**\n${emojis.bc_rules} Commandes: **${client.commands.size}**`)
            .addField(`__Informations Version__`, `${emojis.bc_discordjs} Discord.Js **${djsversion}**\n${emojis.bc_nodejs} Node.Js: **${process.version}**`)
            .addField(`\u200B`, `${emojis.bc_liens} [Support](https://discord.gg/zepjJrAgPx)・[Ajoutez-moi](https://discord.com/oauth2/authorize?client_id=814886281984737340&scope=bot&permissions=2147483647)`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`botinfo\` est survenue dans **${message.guild.name}**.`)
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