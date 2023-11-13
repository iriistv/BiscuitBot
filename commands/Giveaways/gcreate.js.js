const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');
const ms = require('ms');

module.exports = {
    name: 'gcreate',
    aliases: ['gstart'],
    category: 'Giveaways',
    description: 'Renvoit un giveaway',
    giveaways: true,
    permission: ['SEND_MESSAGES', 'MANAGE_GUILD'],
    usage: '<#salon> <durée> <nombre de gagnant(s)> <récompense>',

    run : async (client, message, args) => {

        try {
            if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'avez pas la permission réquise (\`MANAGE_GUILD\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if(!channel) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez fournir un salon où vous souhaiteriez que j'envoie votre giveaway.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const giveawayDuration = args[1];
            if(!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez indiquer une durée pour votre giveaway.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const giveawayWinners = args[2];
            if(isNaN(giveawayWinners)) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez indiquer un nombre de gagnants.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const giveawayPrize = args.slice(3).join(' ');
            if(!giveawayPrize) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez indiquer une récompense pour votre giveaway.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            client.giveawaysManager.start(channel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                embedColorEnd: "#2f3136",
                winnerCount: parseInt(giveawayWinners),
                hostedBy: message.author,

                messages: {
                    giveaway: '',
                    giveawayEnded: '',
                    timeRemaining: 'Temps restant: **{duration}**',
                    inviteToParticipate: 'Réagissez avec 🎉 pour participer',
                    winMessage: `${emojis.bc_giveaways} Bravo {winners}, vous avez gagné **{prize}** !`,
                    embedFooter: `${client.user.username} © 2021`,
                    noWinner: `${emojis.bc_cross} Je n'ai pas réussi à déterminer de gagnant !`,
                    hostedBy: '',
                    endedAt: `${client.user.username} © 2021`,
                    winners: 'Gagnant(s)',
                    units: {
                        seconds: 'secondes',
                        minutes: 'minutes',
                        hours: 'heures',
                        days: 'jours',
                        pluralS: false
                    }
                }
            });

            message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_check} Votre giveaway a bien envoyé dans le salon ${channel}.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`gcreate\` est survenue dans **${message.guild.name}**.`)
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