const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');
const axios = require('axios');

module.exports = {
    name: 'covid',
    aliases: ['covid19', 'covidinfo'],
    category: 'Utilitaire',
    description: 'Renvoit les informations sur le covid 19',
    usage: '',
    utilitaire: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {        
        
        try {
            const base_url = 'https://corona.lmao.ninja/v2';

            let url;
            let response;
            let corona;

            try {
                url = `${base_url}/all`
                response = await axios.get(url)
                corona = response.data
            } catch(err) {
                client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
                .setDescription(`Une erreur dans la commande \`covid\` est survenue dans **${message.guild.name}**.`)
                .addField(`__La voici:__`, `\`\`\`JS\n${err}\`\`\``)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                )
            }

            const embed = new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setTitle('Covid 19')
            .setDescription(`Voici les informations sur le covid 19.`)
            .addField(`__Cas:__`, `${corona.cases.toLocaleString()}`, true)
            .addField(`__Rétablis:__`, `${corona.recovered.toLocaleString()}`, true)
            .addField(`__Décès:__`, `${corona.deaths.toLocaleString()}`, true)
            .setImage('https://zupimages.net/up/21/27/2f85.jpg')
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`covid\` est survenue dans **${message.guild.name}**.`)
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