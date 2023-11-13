const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'unlock',
    //aliases: [''],
    category: 'Modération',
    description: 'Permet d\'ouvrir un salon',
    modération: true,
    permission: ['SEND_MESSAGES', 'MANAGE_CHANNELS'],
    usage: '',

    run : async (client, message, args) => {

        try {
            if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'avez pas la permission réquise (\`MANAGE_CHANNELS\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            message.channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: true
            }).then(() => {
                message.channel.send(new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`${emojis.bc_check} Le salon a bien été **unlock**.`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                )
            });
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`unlock\` est survenue dans **${message.guild.name}**.`)
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