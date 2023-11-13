const Discord = require('discord.js');
const emojis = require('../../data/emojis.json');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

module.exports = {
    name: 'lyrics',
    //aliases: [''],
    category: 'Musique',
    description: 'Renvoit les paroles de la musique demandée',
    musique: true,
    //permission: [''],
    usage: '<musique>',

    run : async (client, message, args) => {

        try {
            const music = args.join(' ');
            if(!music) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Veuillez me fournir la musique.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            if(music.length >= 100) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`${emojis.bc_cross} Le nom de votre musique doit faire moins de **100** caractères.`)
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            )

            try {
                const musicFormated = music.toLowerCase().replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, '').split(' ').join('%20');
    
                let res = await fetch(`https://www.musixmatch.com/search/${musicFormated}`);
                res = await res.text();

                let $ = await cheerio.load(res);
                const songLink = `https://musixmatch.com${$('h2[class=\'media-card-title\']').find('a').attr('href')}`;
    
                res = await fetch(songLink);
                res = await res.text();
                $ = await cheerio.load(res);

                const embed = new Discord.MessageEmbed()

                .setColor('#2f3136')
                .setDescription(`Voici les paroles de la musique **${music}**.`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
    
                let lyrics = await $('p[class=\'mxm-lyrics__content \']').text();
                if(lyrics.length > 1000) {
                    lyrics = lyrics.substr(0, 800) + ' ...';
                    embed.addField(`__Paroles:__`, `${lyrics}`)
                } else {
                    embed.addField(`__Paroles:__`, `${lyrics}`)
                }
                message.channel.send(embed);
            } catch(err) {
                return message.channel.send(new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`${emojis.bc_cross} Aucune paroles n'a été trouvée pour **${music}**.`)
                .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                )
            }
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`lyrics\` est survenue dans **${message.guild.name}**.`)
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