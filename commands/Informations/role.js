const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'role',
    aliases: [''],
    category: 'Informations',
    description: 'Renvoit les utilisateurs/membres ayant un certain rôle sur le serveur',
    usage: '<@role> ou <roleID>',
    informations: true,
    permission: ['SEND_MESSAGES', 'MANAGE_ROLES'],

    run : async (client, message, args) => {
        
        try {
            if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'avez pas la permission réquise \`MANAGE_ROLES\` pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
    
            if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Je n'ai pas la permission réquise \`MANAGE_ROLES\` pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
    
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    
            if(!args.length) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez indiquer un rôle valide ou un ID de rôle valide.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
    
            if(!role || role.name === '@everyone' || role.name === '@here') return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez indiquer un rôle valide ou un ID de rôle valide.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
    
            if(message.guild.memberCount !== message.guild.members.cache.size) await message.guild.members.fetch()
    
            let u = message.guild.members.cache.filter(u => u.roles.cache.has(role.id))
            
            if(u.size == 0) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Aucun membre dans le serveur ne possède le rôle ${role}.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )
    
            const embed = new Discord.MessageEmbed()
    
            .setColor('#2f3136')
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            if(u.size <= 0) embed.setDescription(`Voici le membre possédant le rôle ${role}.`).addField(`__Membre:__`, `> ${u.size > 20 ? `${u.map(x => `${x.user}`).slice(0, 20)} et \`${u.size - 20}\` autres personnes.` : u.map(x => ` ${x.user}`)}`)
            if(u.size === 1) embed.setDescription(`Voici le membre possédant le rôle ${role}.`).addField(`__Membre:__`, `> ${u.size > 20 ? `${u.map(x => `${x.user}`).slice(0, 20)} et \`${u.size - 20}\` autres personnes.` : u.map(x => ` ${x.user}`)}`)
            if(u.size > 1) embed.setDescription(`Voici les **${u.size}** membres possédant le rôle ${role}.`).addField(`__Membres:__`, `> ${u.size > 20 ? `${u.map(x => `${x.user}`).slice(0, 20)} et \`${u.size - 20}\` autres personnes.` : u.map(x => ` ${x.user}`)}`)
    
            message.channel.send(embed);    
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`role\` est survenue dans **${message.guild.name}**.`)
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