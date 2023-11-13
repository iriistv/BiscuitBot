const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');
const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    //aliases: [''],
    category: 'Fun',
    description: 'Renvoit une image avec un chat',
    usage: '',
    fun: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {        
        
        try {
            const cat = await fetch('http://aws.random.cat/meow').then(res => res.json()).then(json => json.file);

            const embed = new Discord.MessageEmbed()

            .setColor('#2f3136')
            .setImage(cat)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`cat\` est survenue dans **${message.guild.name}**.`)
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