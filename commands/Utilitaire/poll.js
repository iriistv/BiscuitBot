const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'poll',
    aliases: ['sondage'],
    category: 'Utilitaire',
    description: 'Renvoit un sondage',
    usage: '<votre sondage>',
    utilitaire: true,
    permission: ['SEND_MESSAGES', 'MANAGE_GUILD'],

    run : async (client, message, args) => {

        try {
            const member = message.member || message.author;
    
            if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'avez pas la permission réquise (\`MANAGE_GUILD\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
    
            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if(!channel) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez fournir un salon où vous souhaiteriez que j'envoie votre sondage.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
            
            const sondage = args.slice(1).join(' ');
            if(!sondage) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez fournir un message pour créer votre sondage.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
    
            const embed = new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`Sondage crée par ${member.user.username}`, member.user.displayAvatarURL({dynamic: true}), 'https://discord.gg/zepjJrAgPx')
            .setDescription(`${emojis.bc_sondage} ${sondage}`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_check} Votre sondage a bien été envoyée dans le salon ${channel}.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            channel.send(embed).then((m) => {
                m.react('<:bc_oui:844184301963968552>');
                m.react('<:bc_non:844184399439855657>');
            });
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`poll\` est survenue dans **${message.guild.name}**.`)
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