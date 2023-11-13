const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');
const parseDuration = require('parse-duration');
const humnizeDuration = require('humanize-duration');

module.exports = {
    name: 'tempban',
    //aliases: [''],
    category: 'Modération',
    description: 'Permet de bannir un membre pendant un certains temps',
    modération: true,
    permission: ['SEND_MESSAGES', 'BAN_MEMBERS'],
    usage: '<@mention ou ID> <temps> [raison]',

    run : async (client, message, args) => {

        try {
            if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'avez pas la permission réquise (\`BAN_MEMBERS\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Je n'ai pas la permission réquise (\`BAN_MEMBERS\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!target) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez me fournir le membre à bannir.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(target.user.id === message.author.id) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Il vous est impossible de vous bannir.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(target.user.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Il vous est impossible de bannir le créateur de ce serveur.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(message.member.roles.highest.comparePositionTo(target.roles.highest) < 1) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Je ne peux pas bannir ce membre en raison de ces rôles.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const time = parseDuration(args[1]);
            if(!time) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez indiquer une durée valide.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const reason = args.slice(2).join(' ') || 'Aucune raison fournie';

            const bans = await message.guild.fetchBans();
            if(bans.has(target)) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Le membre fournit est déjà banni du serveur.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            try {
                if(target.bannable) {
                    target.ban({ reason });
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`${emojis.bc_check} ${target} a bien été **ban** du serveur pendant **${humnizeDuration(time, { language: 'fr' })}**.`)
                    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
                    )
                    setTimeout(() => {
                        message.guild.members.unban(target);
                    }, time)
                } else {
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`${emojis.bc_cross} Je ne peux pas bannir ${target}.`)
                    .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
                    )
                }
            } catch(err) {
                return;
            }
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`tempban\` est survenue dans **${message.guild.name}**.`)
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