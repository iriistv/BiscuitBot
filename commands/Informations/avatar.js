const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'avatar',
    aliases: ['picture', 'pdp', 'pp'],
    category: 'Informations',
    description: 'Renvoit la photo de profil d\'un utilisateur/membre',
    informations: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {

        try {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || client.users.cache.get(args[0]) || message.member || message.author;

            const embed = new Discord.MessageEmbed()

            .setColor('#2f3136')
            .setAuthor(`${member.user.username}`, `${member.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .addField(`__Lien de l'avatar:__`, `[Cliquez-ici](${member.user.displayAvatarURL({dynamic: true})})`)
            .setImage(`${member.user.displayAvatarURL({dynamic: true, size: 256})}`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`avatar\` est survenue dans **${message.guild.name}**.`)
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