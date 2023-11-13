const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');
const Guild = require('../../models/Guild');

module.exports = {
    name: 'setlogs',
    //aliases: [''],
    category: 'Configuration',
    description: 'Permet de définir le salon des logs',
    usage: '<#salon ou reset>',
    configuration: true,
    permission: ['SEND_MESSAGES', 'ADMINISTRATOR'],

    run : async (client, message, args) => {        
        
        try {
            if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'avez pas la permission réquise (\`ADMINISTRATOR\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(args[0] === 'reset') {
                const verify = await Guild.findOne({ serverID: message.guild.id, reason: `logs` });
                if(verify) {
                    const newchannel = await Guild.findOneAndDelete({ serverID: message.guild.id, reason: `logs` });
                    return message.channel.send(new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`${emojis.bc_check} Le salon des logs a bien été supprimé.`)
                    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
                    )
                } else {
                    return message.channel.send(new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`${emojis.bc_cross} Vous n'avez pas encore défini de salon, veuillez en définir un.`)
                    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
                    )
                }
            }

            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if(!channel || channel.type != 'text' || !channel.viewable) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Le salon fournit n'est pas valide.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const verify = await Guild.findOne({ serverID: message.guild.id, reason: `logs` })
            if(verify) {
                const newchannel = await Guild.findOneAndUpdate({ serverID: message.guild.id, reason: `logs` }, { $set: { channelID: channel.id, reason: `logs` } }, { new: true });
                await verify.save();
                message.channel.send(new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`${emojis.bc_check} Le salon des logs a bien été mis-à-jour. Les différents logs s'enverront désormais dans ${channel}.`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                )
            } else {
                const verynew = new Guild({
                    serverID: `${message.guild.id}`,
                    channelID: `${channel.id}`,
                    reason: 'logs',
                }).save();
                message.channel.send(new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`${emojis.bc_check} Le salon des logs a bien été défini. Les différents logs s'enverront désormais dans ${channel}.`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                )
            }
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`setlogs\` est survenue dans **${message.guild.name}**.`)
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