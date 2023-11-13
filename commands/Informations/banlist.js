const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'banlist',
    aliases: ['bans'],
    category: 'Informations',
    description: 'Renvoit la liste des utilisateurs bannis',
    usage: '',
    informations: true,
    permission: ['SEND_MESSAGES', 'BAN_MEMBERS'],

    run : async (client, message, args) => {        
        
        try {    
            if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous n'avez pas la permission réquise (\`BAN_MEMBERS\`) pour effectuer cette commande.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const bans = (await message.guild.fetchBans()).map(ban => `${ban.user} (\`${ban.user.id}\`)`);

            const embed = new Discord.MessageEmbed()

            .setColor('#2f3136')
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            if(bans.length <= 0) embed.setDescription(`Voici l'utilisateur banni de ce serveur.`).addField(`__Utilisateur:__`, `>>> ${bans.length > 0 ? `${bans.slice(0, 20).join(', ')} ${bans.length > 20 ? `et \`${bans.length-20}\` autres personnes.` : ''}` : 'Aucun Bannissement.'}`)
            if(bans.length === 1) embed.setDescription(`Voici l'utilisateur banni de ce serveur.`).addField(`__Utilisateur:__`, `>>> ${bans.length > 0 ? `${bans.slice(0, 20).join(', ')} ${bans.length > 20 ? `et \`${bans.length-20}\` autres personnes.` : ''}` : 'Aucun Bannissement.'}`)
            if(bans.length > 1) embed.setDescription(`Voici les **${bans.length}** utilisateurs bannis de ce serveur.`).addField(`__Utilisateurs:__`, `>>> ${bans.length > 0 ? `${bans.slice(0, 20).join(', ')} ${bans.length > 20 ? `et \`${bans.length-20}\` autres personnes.` : ''}` : 'Aucun Bannissement.'}`)

            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`banlist\` est survenue dans **${message.guild.name}**.`)
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