const Discord = require('discord.js');
const QuickChart = require('quickchart-js');

module.exports = {
    name: 'member',
    aliases: ['members'],
    category: 'Informations',
    description: 'Renvoit la catégorie des membres du serveur',
    informations: true,
    permission: ['SEND_MESSAGES'],

    run : async (client, message, args) => {
        
        try {
            const members = message.member.guild.members.cache;
            const chart = new QuickChart();
    
            chart.setWidth(500);
            chart.setHeight(300);
        
            chart.setConfig({
                type: 'doughnut',
                data: {
                    datasets: [
                        {
                            data: [members.filter(member => !member.user.bot).size, message.member.guild.memberCount, members.filter(member => member.user.bot).size],
                            backgroundColor: [
                                'rgb(114,137,218)',
                                'rgb(153,170,181)',
                                'rgb(35,39,42)',
                            ],
                        },
                    ],
                    labels: ['Humains', 'Robots', 'Total'],
                },
                options: {
                    title: {
                        display: true,
                        text: 'Membres du Serveur',
                    },
            
                plugins: {
                    backgroundImageUrl: 'https://cdn.discordapp.com/attachments/841722284146032651/842026301551542292/unknown.png',
                    },
                },
            });

            const embed = new Discord.MessageEmbed()

            .setColor('#2f3136')
            .setDescription(`Voici un graphique sur les membres de ce serveur.\n\n__**Graphique:**__`)
            .setImage(chart.getUrl())
            .setFooter(`${client.user.username} © 2021`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            message.channel.send(embed);
        } catch(err) {
            client.users.cache.get('769577099618811935').send(new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({dynamic: true})}`, 'https://discord.gg/zepjJrAgPx')
            .setDescription(`Une erreur dans la commande \`member\` est survenue dans **${message.guild.name}**.`)
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