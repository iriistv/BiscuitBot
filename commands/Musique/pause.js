const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'pause',
    //aliases: [''],
    category: 'Musique',
    description: 'Met la musique actuelle en pause',
    musique: true,
    permission: ['SEND_MESSAGES', 'CONNECT'],
    usage: '',

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

            if(client.player.getQueue(message).paused) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} La musique est déjà en pause.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(!message.guild.me.hasPermission('CONNECT', 'SPEAK')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Je n'ai pas les permissions réquise (\`CONNECT\` et \`SPEAK\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            await client.player.pause(message);

            message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_check} La musique a bien été mise en pause.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`pause\` est survenue dans **${message.guild.name}**.`)
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