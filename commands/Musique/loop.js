const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'loop',
    //aliases: [''],
    category: 'Musique',
    description: 'Joue la queue ou la musique actuelle à l\infini',
    musique: true,
    permission: ['SEND_MESSAGES', 'CONNECT'],
    usage: '<queue> ou <song>',

    run : async (client, message, args) => {

        try {
            if(!message.member.hasPermission('SEND_MESSAGES', 'CONNECT')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'avez pas les permissions réquise (\`SEND_MESSAGES\` et \`CONNECT\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const channel = message.member.voice.channel;
            if(!channel) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez vous connecter dans un salon vocal.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'êtes pas dans mon salon vocal.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(!client.player.getQueue(message)) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Aucune musique n'est en cours de lecture.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(!message.guild.me.hasPermission('CONNECT', 'SPEAK')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Je n'ai pas les permissions réquise (\`CONNECT\` et \`SPEAK\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const query = ['queue', 'song'];

            if(!query.some(word => message.content.toLowerCase().includes(word))) {
                return message.channel.send(new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`${emojis.bc_cross} Veuillez fournir des arguments valide (**queue** ou **song**).`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                )
            }

            if(args[0].toLowerCase() === 'queue') {
                if(client.player.getQueue(message).loopMode) {
                    client.player.setLoopMode(message, false);
                    return message.channel.send(new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`${emojis.bc_check} Le mode répétition de queue a bien été désactivé.`)
                    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
                    )
                } else {
                    client.player.setLoopMode(message, true);
                    return message.channel.send(new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`${emojis.bc_check} Le mode répétition de queue a bien été activé.`)
                    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
                    )
                }
            } else if(args[0].toLowerCase() === 'song') {
                if(client.player.getQueue(message).repeatMode) {
                    client.player.setRepeatMode(message, false);
                    return message.channel.send(new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`${emojis.bc_check} Le mode répétition de musique a bien été désactivé.`)
                    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
                    )
                } else {
                    client.player.setRepeatMode(message, true);
                    return message.channel.send(new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`${emojis.bc_check} Le mode répétition de musique a bien été activé.`)
                    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
                    )
                }
            }
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`loop\` est survenue dans **${message.guild.name}**.`)
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