const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');
const fetch = require('node-fetch');

module.exports = {
    name: 'kiss',
    //aliases: [''],
    category: 'Fun',
    description: 'Renvoit une image avec un bisou',
    usage: '',
    fun: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {        
        
        try {
            var kiss = [
                'https://media.tenor.com/images/6702ca08b5375a74b6b9805382021f73/tenor.gif',
                'https://media.tenor.com/images/26aaa1494b424854824019523c7ba631/tenor.gif',
                'https://media.tenor.com/images/924c9665eeb727e21a6e6a401e60183b/tenor.gif',
                'https://media.tenor.com/images/f2795e834ff4b9ed3c8ca6e1b21c3931/tenor.gif',
                'https://media.tenor.com/images/197df534507bd229ba790e8e1b5f63dc/tenor.gif',
                'https://media.tenor.com/images/4b75a7e318cb515156bb7bfe5b3bbe6f/tenor.gif',
                'https://media.tenor.com/images/4e9c5f7f9a6008c1502e1c12eb5454f9/tenor.gif',
                'https://media.tenor.com/images/7b50048d76f76a8e5b3d8fc5a3fc6a21/tenor.gif',
                'https://media.tenor.com/images/dd777838018ab9e97c45ba34596bb8de/tenor.gif',
                'https://media.tenor.com/images/68d59bb29d7d8f7895ce385869989852/tenor.gif',
                'https://media.tenor.com/images/b020758888323338c874c549cbca5681/tenor.gif',
                'https://media.tenor.com/images/02b3ad0fb1d6aa77daeee0ace21d5774/tenor.gif',
                'https://media.tenor.com/images/29b22bb26ecc0943c95b9a1be81d3054/tenor.gif',
                'https://media.tenor.com/images/6e4be7dcabb41ee76f2372f0492fc107/tenor.gif',
                'https://media.tenor.com/images/45246226e54748be5175ab15206de1c5/tenor.gif',
                'https://media.tenor.com/images/a23d2ec86610bd1dd026a07853992b57/tenor.gif',
                'https://media.tenor.com/images/556f881d184f4dbfc4f99ae720273457/tenor.gif'
            ];

            const result = kiss[Math.floor(Math.random() * kiss.length)];

            const target = message.mentions.members.first();
            if(!target) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez fournir le membre que vous souhaitez embrasser.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(target.id === message.author.id) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Vous ne pouvez pas vous embrasser.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const embed = new Discord.MessageEmbed()

            .setColor('#2f3136')
            .setAuthor(`${message.member.user.username} embrasse ${target.user.username}`, `${message.member.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setImage(result)
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