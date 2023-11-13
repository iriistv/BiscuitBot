const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');
const db = require('quick.db');

module.exports = {
    name: 'unmute',
    //aliases: [''],
    category: 'Modération',
    description: 'Permet d\'unmute un membre',
    modération: true,
    permission: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
    usage: '<@mention ou ID> [raison]',

    run : async (client, message, args) => {

        try {
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'avez pas la permission réquise (\`MANAGE_MESSAGES\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(!message.guild.me.hasPermission('MANAGE_MESSAGES', 'MANAGE_ROLES')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Je n'ai pas les permissions réquise (\`MANAGE_MESSAGES\` et \`MANAGE_ROLES\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!target) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez me fournir le membre à unmute.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(target.user.id === message.author.id) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Il vous est impossible de vous unmute.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(target.user.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Il vous est impossible d'unmute le créateur de ce serveur.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(message.member.roles.highest.comparePositionTo(target.roles.highest) < 1) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Je ne peux pas unmute ce membre en raison de ces rôles.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const muteRole = message.guild.roles.cache.get(db.get(`guild_${message.guild.id}_muteRoleID`));
            if(!muteRole) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Le rôle n'a pas été trouvé.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const reason = args.slice(1).join(' ') || 'Aucune raison fournie';

            try {
                if(!target.roles.cache.find(r => r.id === muteRole.id)) return message.channel.send(new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`${emojis.bc_cross} ${target} n'est pas mute, veuillez réesayer.`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                )
                target.roles.remove(muteRole, reason);
                message.channel.send(new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`${emojis.bc_check} ${target} a bien été **unmute**.`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                )
        
                if(target.deleted || !target.manageable) {
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`${emojis.bc_cross} Je ne peux pas unmute ${target}.`)
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
            .setDescription(`Une erreur dans la commande \`unmute\` est survenue dans **${message.guild.name}**.`)
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