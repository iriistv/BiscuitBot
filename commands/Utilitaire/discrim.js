const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');

module.exports = {
    name: 'discrim',
    //aliases: [''],
    category: 'Utilitaire',
    description: 'Renvoit le nombre de membres ayant un certain discriminateur',
    usage: '',
    utilitaire: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {        
        
        try {
            const discrim = args[0];
            if(!discrim) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez me fournir un discriminateur.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(message.guild.memberCount !== message.guild.members.cache.size) await message.guild.members.fetch();

            const number = message.guild.members.cache.filter(m => m.user.discriminator === discrim);
            if(number.size === 0) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Aucun membre ne possède le discriminateur **${discrim}**.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            const embed = new Discord.MessageEmbed()

            .setColor('#2f3136')
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            if(number.size <= 0) embed.setDescription(`Voici l'utilisateur qui a le discriminateur **${discrim}**.`).addField(`__Utilisateur:__`, `>>> ${number.size > 20 ? `${number.map(x => `<@${x.user.id}> (\`${x.user.id}\`)`).slice(0, 20)} et **${number.size - 20}** autres personnes.` : number.map(x => `<@${x.user.id}> (\`${x.user.id}\`)`)}`)
            if(number.size === 1) embed.setDescription(`Voici l'utilisateur qui a le discriminateur **${discrim}**.`).addField(`__Utilisateur:__`, `>>> ${number.size > 20 ? `${number.map(x => `<@${x.user.id}> (\`${x.user.id}\`)`).slice(0, 20)} et **${number.size - 20}** autres personnes.` : number.map(x => `<@${x.user.id}> (\`${x.user.id}\`)`)}`)
            if(number.size > 1) embed.setDescription(`Voici les **${number.size}** utilisateurs qui ont le discriminateur **${discrim}**.`).addField(`__Utilisateurs:__`, `>>> ${number.size > 20 ? `${number.map(x => `<@${x.user.id}> (\`${x.user.id}\`)`).slice(0, 20)} et **${number.size - 20}** autres personnes.` : number.map(x => `<@${x.user.id}> (\`${x.user.id}\`)`)}`)

            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`discrim\` est survenue dans **${message.guild.name}**.`)
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