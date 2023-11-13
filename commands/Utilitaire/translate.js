const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');
const translate = require('@vitalets/google-translate-api');

module.exports = {
    name: 'translate',
    //aliases: [''],
    category: 'Utilitaire',
    description: 'Renvoit la traduction d\'un message',
    usage: '<langue> <message>',
    utilitaire: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {        
        
        try {
            const lang = args[0];
            if(!lang) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez me fournir la langue.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const text = args.slice(1).join(' ');
            if(!text) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez me fournir un message à traduire.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            await translate(text, { to: lang }).then((res) => {
                message.channel.send(new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`➜ ${res.text}`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                )
            }).catch((err) => {
                message.channel.send(new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`${emojis.bc_cross} La langue fournie n'est pas valide.`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                )
            });
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`translate\` est survenue dans **${message.guild.name}**.`)
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