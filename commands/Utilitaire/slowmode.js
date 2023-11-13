const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');
const ms = require('ms');

module.exports = {
    name: 'slowmode',
    //aliases: [''],
    category: 'Utilitaire',
    description: 'Permet de mettre un slowmode',
    usage: '<temps>',
    utilitaire: true,
    permission: ['SEND_MESSAGES', 'MANAGE_CHANNELS'],

    run : async (client, message, args) => {        
        
        //try {
            if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'avez pas la permission réquise (\`MANAGE_CHANNELS\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(args[0] === 'disable') {
                message.channel.setRateLimitPerUser(0);
                return message.channel.send(new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`${emojis.bc_check} Le slowmode a bien été désactivé.`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                )
            }

            const time = args[0];
            if(!time) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez me fournir une durée.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const milliseconds = ms(time);
            if(isNaN(milliseconds)) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez me fournir une durée valide.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(milliseconds <= 4999 || milliseconds > 81600000) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} La durée minimum est fixée à **5 secondes** et la maximum à **6 heures**, veuillez réesayer.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            message.channel.setRateLimitPerUser(milliseconds / 1000);
            message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_check} Le slowmode a bien été modifié.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            //if(milliseconds === 10000 || milliseconds === 15000 || milliseconds === 30000 || milliseconds === 60000 || milliseconds === 120000 || milliseconds === 300000 || milliseconds === 600000 || milliseconds === 900000 || milliseconds === 360000 || milliseconds === 720000 || milliseconds === 1440000 || milliseconds === 4320000)
        /*} catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`slowmode\` est survenue dans **${message.guild.name}**.`)
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
        }*/
    }
}