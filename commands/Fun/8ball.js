const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: '8ball',
    //aliases: [''],
    category: 'Fun',
    description: 'Renvoit une réponse aléatoire à une question',
    usage: '<question>',
    fun: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {        
        
        try {
            var items = [
                'Je ne sais pas',
                'Evidemment',
                'Oui',
                'Non',
                'Pourquoi pas',
                'Peut-être',
                'Ouais',
                'Mouais',
                'Je ne suis pas sûr',
                'Je n\'en sais trop rien'
            ];

            const result = items[Math.floor(Math.random() * items.length)];

            const question = args.join(' ');
            if(!question) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez me fournir une question.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const embed = new Discord.MessageEmbed()

            .setColor('#2f3136')
            .addField(`__Question:__`, `➜ ${args.join(' ')}`)
            .addField(`__Réponse:__`, `➜ ${result}`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            
            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`8ball\` est survenue dans **${message.guild.name}**.`)
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