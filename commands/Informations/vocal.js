const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'vocal',
    aliases: ['vc', 'vocalinfo'],
    category: 'Informations',
    description: 'Renvoit le nombre d\'utilisateur(s)/membre(s) en vocal sur le serveur',
    informations: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {

        try {
            const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');

            let count = 0;
            for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    
            const embed = new Discord.MessageEmbed()
    
            .setColor('#2f3136')
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
    
            if(count <= 0) embed.setDescription(`${emojis.bc_vocal} Dans ce serveur, il y a actuellement **${count}** utilisateur en vocal.`)
            if(count === 1) embed.setDescription(`${emojis.bc_vocal} Dans ce serveur, il y a actuellement **${count}** utilisateur en vocal.`)
            if(count > 1) embed.setDescription(`${emojis.bc_vocal} Dans ce serveur, il y a actuellement **${count}** utilisateurs en vocal.`)
            
            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`vocal\` est survenue dans **${message.guild.name}**.`)
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