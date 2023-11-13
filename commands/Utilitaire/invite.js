const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'invite',
    aliases: ['links'],
    category: 'Utilitaire',
    description: 'Renvoit les différents liens concernant le bot',
    usage: '',
    utilitaire: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {        
        
        try {
            const embed = new Discord.MessageEmbed()

            .setColor('#2f3136')
            .setDescription(`${emojis.bc_liens} [Support](https://discord.gg/zepjJrAgPx)・[Ajoutez-moi](https://discord.com/oauth2/authorize?client_id=814886281984737340&scope=bot&permissions=2147483647)`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`invite\` est survenue dans **${message.guild.name}**.`)
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