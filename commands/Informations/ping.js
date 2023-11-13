const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'ping',
    //aliases: [''],
    category: 'Informations',
    description: 'Renvoit la latence du bot',
    informations: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {

        try {
            const msg = await message.channel.send(`${emojis.bc_loading} Chargement en cours ...`);

            const embed = new Discord.MessageEmbed()

            .setColor('#2f3136')
            .setDescription(`${emojis.bc_ping} J'ai une latence de **${Math.floor(msg.createdAt - message.createdAt)}** ms.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            await msg.edit('', embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`ping\` est survenue dans **${message.guild.name}**.`)
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